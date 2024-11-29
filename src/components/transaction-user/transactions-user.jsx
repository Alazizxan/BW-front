import React from 'react';

const TransactionUser = ({
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
    <div className=" text-white rounded-lg shadow-lg p-4  flex justify-between items-center">
      <div className="flex items-center">
        
        <div>
          <p className="font-medium">{userName}</p>
          
         
        </div>
      </div>
      <div className="text-right">
      <p className="font-medium">{amount}-{cryptoName}</p>
      </div>
      <div className="text-right">
      <p className="text-gray-400">{new Date(date).toLocaleDateString()}</p>
        
      </div>
      
    </div>
  );
};

export default TransactionUser;