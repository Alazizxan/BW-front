import React, { useState, useEffect, useCallback } from "react";

// Importlar UI va tonConnect bilan ishlash uchun
import UIPageIndicator from "../components/ui/PageIndicator/PageIndicator.jsx";
import UIStatus from "../components/ui/PageStatus/PageStatus.jsx";
import Profile from "../components/profile/Profile.jsx";
import Countdown from "../components/countdown/Countdown.jsx";

// Store va API bilan ishlash
import useAppStore from "../store/app.js";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { connectWallet, disconnectWallet } from "../api/index.js";

export default function Wallet() {
    const app = useAppStore();

    const [tonConnectUI] = useTonConnectUI();
    const [tonWalletAddress, setTonWalletAddress] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [transactionStatus, setTransactionStatus] = useState(null);

    // Walletni ulash
    const handleWalletConnection = useCallback(async (address) => {
        setIsLoading(true);
        await connectWallet(app.user.id, address).then(() => {
            setIsLoading(false);
            setTonWalletAddress(address);
        });
        console.log("Wallet connected successfully!");
    }, []);

    // Walletni uzish
    const handleWalletDisconnection = useCallback(async () => {
        setIsLoading(true);
        await dissconnectWallet(app.user.id).then(() => {
            setIsLoading(false);
            setTonWalletAddress(null);
        });
        console.log("Wallet disconnected successfully!");
    }, []);

    // Wallet holatini tekshirish va boshqarish
    useEffect(() => {
        const checkWalletConnection = async () => {
            if (tonConnectUI.account?.address) {
                await handleWalletConnection(tonConnectUI.account?.address);
            } else {
                await handleWalletDisconnection();
            }
        };

        checkWalletConnection();

        const unsubscribe = tonConnectUI.onStatusChange(async (wallet) => {
            if (wallet) {
                await handleWalletConnection(wallet.account.address);
            } else {
                await handleWalletDisconnection();
            }
        });

        return () => {
            unsubscribe();
        };
    }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

    // TON tranzaksiyasini amalga oshirish
    const handleAutoPayment = async () => {
        if (!tonWalletAddress) {
            console.error("Wallet address is missing.");
            return;
        }
    
        const transaction = {
            to: tonWalletAddress,
            value: '0.005', // To'lov miqdori: 0.005 TON
            message: 'Transaction fee for activating wallet',
        };
    
        if (!transaction.to || !transaction.to.length) {
            console.error("Transaction 'to' address is invalid.");
            return;
        }
    
        try {
            setIsLoading(true);
            console.log("Sending transaction:", transaction);
            const result = await tonConnectUI.sendTransaction(transaction);
            
            if (result.success) {
                setTransactionStatus('active');
                console.log("Transaction successful!");
            } else {
                setTransactionStatus('error');
                console.error("Transaction failed!");
            }
        } catch (error) {
            if (error instanceof TonConnectUIError) {
                console.error('Transaction Error:', error.message);
            } else {
                console.error('Unexpected Error:', error);
            }
            setTransactionStatus('error');
        } finally {
            setIsLoading(false);
        }
    };
    

    // Wallet ulanish yoki uzish uchun harakat
    const handleWalletAction = async () => {
        if (tonConnectUI.connected) {
            setIsLoading(true);
            await tonConnectUI.disconnect();
        } else {
            await tonConnectUI.openModal();
        }
    };

    return (
        <>
            <UIStatus 
                friends={120} 
                user={{
                    firstName: app.user.firstName,
                    balance: app.user.balance,
                    profileImage: app.profileImage
                }}
            />

            <UIPageIndicator page="Wallet" />

            {
                app.status === true && (
                    <Countdown />
                )
            }

            {
                app.status === false && (
                    <div className="after-countdown mt-[12%]">
                        <Profile user={app.user} profileImage={app.profileImage} />
                    </div>
                )
            }

            <div className="btn-container">
                {
                    app.status && (
                        <button 
                            disabled={!tonWalletAddress} 
                            onClick={() => console.log("invite")} 
                            className="show-btn">
                            Cash withdrawal
                        </button>
                    )
                }

                {
                    tonWalletAddress ? (
                        <>
                            <button 
                                onClick={handleWalletAction} 
                                className="show-btn disconnect">
                                {isLoading ? "Loading" : "Disconnect your wallet"}
                            </button>
                            <button 
                                onClick={handleAutoPayment} 
                                className="show-btn pay">
                                Pay 0.005 TON
                            </button>
                        </>
                    ) : (
                        <button 
                            onClick={handleWalletAction} 
                            className="show-btn">
                            {isLoading ? "Loading" : "Connect your wallet"}
                        </button>
                    )
                }
            </div>
        </>
    );
}
