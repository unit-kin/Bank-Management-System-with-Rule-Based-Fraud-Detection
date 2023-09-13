import React, { useState, useEffect } from 'react';
import './FraudNotifications.css'
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

const FraudNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchData = () => {
    fetch('http://127.0.0.1:5000/api/fraud-notifications', {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        setNotifications(data);
        setUnreadCount(data.length);
    })
    .catch(error => console.error('Error fetching fraud notifications:', error));
  };

  useEffect(() => {
    fetchData(); // fetch data initially
    const intervalId = setInterval(fetchData, 5000); // fetch every 5 seconds

    return () => clearInterval(intervalId); // cleanup the interval on component unmount
  }, []);

  const handleViewNotification = (id) => {
    fetch(`http://127.0.0.1:5000/api/mark-notification-read/${id}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Server responded with status: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        fetchData(); // Fetch the updated notifications
    })
    .catch(error => console.error('Error marking the notification as read:', error));
};




  return (
    <>
    <div className='badge'>
    <p>Fraud-Notifications</p>
    <Badge badgeContent={unreadCount} color="success">
        <MailIcon color="action" />
      </Badge>

    </div>
    <div className='MessageContainer'>
      {/* Badge showing number of unread notifications */}
      
      {notifications.length > 0 ? (
    notifications.map((notification, index) => (
      <div key={index} className='Message'>
        {notification.reason} <br />
        Transaction type: {notification.transactiontype} <br />
        User: {notification.sender_username} <br />
        Amount: {notification.amount} <br />
        On {new Date(notification.date).toLocaleString()} <br />
        {!notification.read && 
            <button onClick={() => handleViewNotification(notification.transaction_id)}>Mark as Read</button>

        }
      </div>
    ))
) : (
    <div>No Fraud Notifications</div>

      )}
    </div>
    </>
  );
}

export default FraudNotifications;
