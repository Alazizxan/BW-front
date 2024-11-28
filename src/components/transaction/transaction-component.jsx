import React from 'react';

const Transaction = ({
  transactionId,
  userName,
  userProfileImage,
  cryptoName,
  amount,
  date,
  description,
  userBalance,
  onDelete,
}) => {
  return (
    <div className="bg-gray-900 text-white rounded-lg shadow-lg p-4 flex justify-between items-center">
      <div className="flex items-center">
        <img
          src={userProfileImage}
          alt={userName}
          className="w-10 h-10 rounded-full mr-2"
        />
        <div>
          <p className="font-medium">{userName}</p>
          <p className="text-gray-400">{cryptoName}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">{amount}</p>
        <p className="text-gray-400">{new Date(date).toLocaleDateString()}</p>
      </div>
      <div className="text-right">
        <p className="font-medium">{description}</p>
        <p className="text-gray-400">Balance: {userBalance}</p>
      </div>
      <button
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default Transaction;