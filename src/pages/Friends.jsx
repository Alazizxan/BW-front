import React from "react";

import UIStatus from "../components/ui/PageStatus/PageStatus.jsx";
import UIPageIndicator from "../components/ui/PageIndicator/PageIndicator.jsx";
import Friend from "../components/friend/Friend.jsx";
import useAppStore from "../store/app.js";

export default function Friends() {
    const app = useAppStore();

    return <>
        <UIStatus friends={120} user={{
            firstName: app.user.firstName,
            profileImage: app.profileImage
        }} />

        <UIPageIndicator page="Friends" />

         <div className="tasks max-h-[350px] flex flex-col gap-[8px] mt-[15px] overflow-y-scroll">
            <Friend friendName={app.user.firstName} money={100} clock={'22:10'} date={"24.10.2024"} />
            <Friend friendName={app.user.firstName} money={100} clock={'22:10'} date={"24.10.2024"} />
            <Friend friendName={app.user.firstName} money={100} clock={'22:10'} date={"24.10.2024"} />
            <Friend friendName={app.user.firstName} money={100} clock={'22:10'} date={"24.10.2024"} />
            <Friend friendName={app.user.firstName} money={100} clock={'22:10'} date={"24.10.2024"} />
        </div>

         <div className="btn-container">
            <button onClick={() => console.log("invite")} className="show-btn">Invite Friend</button>
        </div>
    </>
}

