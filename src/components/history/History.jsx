import React from 'react';
import './History.css';

function History({ value, money, date, clock }) {
  return (
    <div className="history">
      <div className="profile">
        <div className="profile-text">
          <span className="friend-name">{value}</span>
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

export default History;