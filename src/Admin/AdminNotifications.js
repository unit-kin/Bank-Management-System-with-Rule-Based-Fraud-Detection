// AdminNotifications.js

import React from 'react';
import './AdminNotifications.css';

const AdminNotifications = ({ transactions }) => {
    return (
        <div className="messageContainer">
            <h4>Recent Transactions</h4>
            {transactions.data.map((transaction, index) => (
                <div key={index} className="message" style={{ backgroundColor: transactions.isNew ? 'lightyellow' : 'white' }}>
                    {transaction.sender_username} sent {transaction.amount} to {transaction.receiver_username} on {new Date(transaction.date).toLocaleString()}
                </div>
            ))}
        </div>
    );
};

export default AdminNotifications;
