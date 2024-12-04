import React from 'react';
import './Friend.css';
import defaultProfileImage from '../../assets/images/friend-profile.svg';

function Friend({ profileImage, friendName, money, date, clock }) {
  // Profile image "no picture" bo'lsa, default tasvirni o'rnatish
  const profileImageUrl =
    profileImage === 'no picture'
      ? 'https://sun9-42.userapi.com/impg/NcjMNQqzJOGAMIo-mr9xug659g8TknUfDaPRAw/8eht64cTTbo.jpg?size=1280x1262&quality=95&sign=1b67c613f18a20a3ffad4048e2e4c741&c_uniq_tag=sHZbK2c62GOdVLagM5zsETeedrtSpmuIDZNAB8H_G2o&type=album'
      : profileImage;

  return (
    <div className="friend-task">
      <div className="profile">
        <img className="profile-img" src={profileImageUrl} alt="profile" />

        <div className="profile-text">
          <span className="friend-name">{friendName}</span>
          <span className="money">{money} BW</span>
        </div>
      </div>

      <div className="date">
        <span className="date-text">{date}</span>
        <span className="clock-text">{clock}</span>
      </div>
    </div>
  );
}

export default Friend;
