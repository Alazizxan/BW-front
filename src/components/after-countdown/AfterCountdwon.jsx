import './AfterCountdown.css'

import UIPageIndicator from "../ui/PageIndicator/PageIndicator.jsx";



export default function AfterCountdwon({user, profileImage}) {
    return <>
       <div className="profile">
            <div className="profile-container">
              <img
                className="avatar"
                src={profileImage}
                alt="profile"
              />
              <span className="nickname">{user.firstName}</span>
              <span className="account-balance">
                {user.balance || 0}
              </span>
            </div>
       </div>
    </>
}