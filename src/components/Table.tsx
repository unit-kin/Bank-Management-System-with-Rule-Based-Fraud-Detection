import React from 'react';

const MessageBox = ({ transactions = [], username }) => {
  
  // Function to get the message text based on the transaction type
  const getMessageText = (transaction) => {
    const { transactiontype, amount, receiver_username, sender_username, date } = transaction;

    // Convert amount to a number, if it's not already one
    const formattedAmount = Number(amount).toFixed(2);

    // Format the date to display. This example displays the date in the format: 'DD-MM-YYYY HH:mm'
    const formattedDate = new Date(date).toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    switch (transactiontype) {
        case 'Transfer':
          if(sender_username === username) {
            return `On ${formattedDate}, you transferred $${formattedAmount} to ${receiver_username}.`;
          } else {
            return `On ${formattedDate}, ${sender_username} transferred $${formattedAmount} to you.`;
          }
        case 'Deposit':
          return `On ${formattedDate}, you deposited $${formattedAmount}.`;
        case 'Withdrawal':
          return `On ${formattedDate}, you withdrew $${formattedAmount}.`;
        default:
          return '';
      }
    };


  return (
    <div className="message-box" style={{ maxHeight: '40vh', overflowY: 'auto' }}>
      <div className="messages">
        {transactions.map((transaction, index) => (
          <div key={index} className="message">
            <span>{getMessageText(transaction)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageBox;
