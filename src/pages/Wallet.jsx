import React from "react";

import UIPageIndicator from "../components/ui/PageIndicator/PageIndicator.jsx";
import UIStatus from "../components/ui/PageStatus/PageStatus.jsx";

import useAppStore from "../store/app.js";
import Profile from "../components/profile/Profile.jsx";

export default function Wallet() {
    const app = useAppStore();

    return <>
         <UIStatus friends={120} user={{
            firstName: app.user.firstName,
            balance: app.user.balance,
            profileImage: app.profileImage
        }} />

        <UIPageIndicator page="Wallet" />

        <div className="after-countdown mt-[20%]">
            <Profile user={app.user} profileImage={app.profileImage} />
        </div>


        <div className="btn-container">
            <button  onClick={() => console.log("invite")} className="show-btn">Connect wallet</button>
            <button onClick={() => console.log("invite")} className="show-btn">Cash withdrawal</button>
        </div>
    </>
}

