import { useNavigate } from "react-router-dom";

import React from "react";
import ActiveCard from "../components/active/active.jsx";
import Profile from "../components/profile/Profile.jsx";
import useAppStore from "../store/app.js";


export default function Home() {
    const navigate = useNavigate();
    const app = useAppStore()

    const action = () => {
        navigate('/earn')
    }

    return <>
       <div className="mt-[20px]">
            <ActiveCard
                taskTitle="Premium"
                taskDescription="Get active and get prize!"
                status={false}
                action={() => action()}
            />
        </div>

        <Profile profileImage={app.profileImage} user={app.user} />

         <div className="btn-container">
            <button onClick={action} className="show-btn">Show Tasks</button>
        </div>
    </>
}

