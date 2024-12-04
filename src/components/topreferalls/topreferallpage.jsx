import React from 'react';

const TopReferralCard = ({ user, index }) => {
  // Foydalanuvchining ismini 9-chi harfgacha kesish
  const truncatedFirstName =
    user.firstName.length > 8 ? user.firstName.slice(0, 9) : user.firstName;

  // Ton qiymatini hisoblash
  const tonValue = index === 0 ? 150 : Math.max(150 - index * 15, 0);

  return (
    <div className="mb-[5px]">
      <div className="friend-task">
        <div className="profile">
          <div className="profile-index">{index + 1}</div>

          <div>
            <img
              className="profile-img2"
              src="\src\assets\images\top10.jpg"
              alt={`${user.firstName} profile`}
            />
          </div>

          <div className="profile-text">
            <span className="friend-name">{truncatedFirstName}</span>
          </div>

          <div className="text-money">
            <span className="money">{tonValue} Ton</span>
          </div>
        </div>

        <div className="date">
          <span className="date-text">{user.date}</span>
          <span className="clock-text">{user.referralCount} Friends</span>
        </div>
      </div>
    </div>
  );
};

export default TopReferralCard;
