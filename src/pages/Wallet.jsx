import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';

import UIPageIndicator from "../components/ui/PageIndicator/PageIndicator.jsx";
import UIStatus from "../components/ui/PageStatus/PageStatus.jsx";
import Profile from "../components/profile/Profile.jsx";
import Countdown from "../components/countdown/Countdown.jsx";
import { activateUser, getWallet } from "../api/index.js";
import useAppStore from "../store/app.js";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { connectWallet, disconnectWallet } from "../api/index.js";

export default function Wallet() {
    const app = useAppStore();
    const [tonConnectUI] = useTonConnectUI();
    const [tonWalletAddress, setTonWalletAddress] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [transactionStatus, setTransactionStatus] = useState(null);

    // Walletni ulash va tekshirish
    const handleWalletConnection = useCallback(async (address) => {
        const existingWallet = await getWallet(app.user.id);
        
        if (!existingWallet) {
            setIsLoading(true);
            await connectWallet(app.user.id, address);
            setIsLoading(false);
        }
        
        setTonWalletAddress(address);
        console.log("Wallet connected successfully!");
    }, [app.user.id]);
    
    // Walletni uzish faqat qo'lda bajarilsin
    const handleWalletDisconnection = useCallback(async () => {
        setIsLoading(true);
        await disconnectWallet(app.user.id).then(() => {
            setIsLoading(false);
            setTonWalletAddress(null);
        });
        console.log("Wallet disconnected successfully!");
    }, [app.user.id]);
    
    // Wallet holatini tekshirish va boshqarish
    useEffect(() => {
        const checkWalletConnection = async () => {
            try {
                const existingWallet = await getWallet(app.user.id);
                
                if (existingWallet && existingWallet.walletAddress) {
                    setTonWalletAddress(existingWallet.walletAddress);
                    return;
                }
                
                if (tonConnectUI.account?.address) {
                    await handleWalletConnection(tonConnectUI.account.address);
                }
            } catch (error) {
                console.error("Wallet check error:", error);
            }
        };
    
        checkWalletConnection();
    
        const unsubscribe = tonConnectUI.onStatusChange(async (wallet) => {
            if (wallet) {
                await handleWalletConnection(wallet.account.address);
            }
        });
    
        return () => {
            unsubscribe();
        };
    }, [tonConnectUI, handleWalletConnection, app.user.id]);
    
    // TON tranzaksiyasini amalga oshirish
    const handleAutoPayment = async () => {
        try {
            const transaction = {
                validUntil: Date.now() + 10 * 1000,
                messages: [
                    {
                        address: "UQCs0w1PhmdGdXj_rFQO72yZ0j42wbvKr8dTjNoT4gRTQyhk",
                        amount: "10000000"
                    }
                ],
            };
    
            const result = await tonConnectUI.sendTransaction(transaction);
            console.log('Transaction successful:', result);
    
            const telegramId = app.user.telegramId;
            try {
                const activationResponse = await activateUser(telegramId);
                console.log('User activated successfully:', activationResponse);
            } catch (activationError) {
                console.error('User activation failed:', activationError);
            }
    
            setTransactionStatus('success');
        } catch (error) {
            console.error('Transaction Error:', error);
            setTransactionStatus('error');
        }
    };
    
    const navigate = useNavigate();
    const handlePrizeClick = () => {
        navigate('/myprize');
    };
    

    // Wallet ulanish yoki uzish uchun harakat
    const handleWalletAction = async () => {
        if (tonConnectUI.connected) {
            await handleWalletDisconnection(); // Calls the disconnection function
        } else {
            await tonConnectUI.openModal(); // Connects the wallet if not connected
        }
    };

    return (
        <>
            <UIStatus 
                friends={app.user.balance} 
                user={{
                    firstName: app.user.firstName,
                    balance: app.user.balance,
                    profileImage: app.profileImage
                }}
            />

            <UIPageIndicator page="Wallet" />

            {app.status === true && <Countdown />}
            {app.status === false && (
                <div className="after-countdown mt-[12%]">
                    <Profile user={app.user} profileImage={app.profileImage} />
                </div>
            )}

            <div className="btn-container">
                {app.status && (
                    <button 
                        disabled={!tonWalletAddress} 
                        onClick={() => console.log("invite")} 
                        className="show-btn">
                        Cash withdrawal
                    </button>
                )}

                {tonWalletAddress ? (
                    <>
                        <button 
                            onClick={handleWalletAction} 
                            className="show-btn disconnect">
                            {isLoading ? "Loading" : "Disconnect your wallet"}
                        </button>
                        {app.user.activation ? (
                            <button 
                                onClick={handlePrizeClick}
                                className="show-btn prize">
                                My Prize
                            </button>
                        ) : (
                            <button 
                                onClick={handleAutoPayment} 
                                className="show-btn pay">
                                Pay 0.005 TON
                            </button>
                        )}
                    </>
                ) : (
                    <button 
                        onClick={handleWalletAction} 
                        className="show-btn">
                        {isLoading ? "Loading" : "Connect your wallet"}
                    </button>
                )}
            </div>
        </>
    );
}
