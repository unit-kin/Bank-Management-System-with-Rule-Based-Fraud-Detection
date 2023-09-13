import React, { useState, useEffect } from 'react';
import './Cards.css';
import { HiUsers } from 'react-icons/hi';
import { MdMoneyOff } from 'react-icons/md';
import { FaMoneyBillTransfer } from 'react-icons/fa6';

const Cards = () => {
    const [dailyTransactions, setDailyTransactions] = useState(0);
    const [usersCount, setUsersCount] = useState(0);
    const [fraudulentTransactions, setFraudulentTransactions] = useState(0);

    useEffect(() => {
        // Fetch the number of daily transactions
        fetch('http://127.0.0.1:5000/api/daily-transaction-count', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setDailyTransactions(data.count))
        .catch(error => console.error("Error fetching daily transactions:", error));

        // Fetch the total number of users excluding admins
        fetch('http://127.0.0.1:5000/api/user-count', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setUsersCount(data.count))
        .catch(error => console.error("Error fetching users count:", error));

        fetch('http://127.0.0.1:5000/api/fraud-transaction-count', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res => res.json())
        .then(data => setFraudulentTransactions(data.count))
        .catch(error => console.error("Error fetching fraudulent transactions count:", error));

    }, []);

    return (
        <div className='Orgcards'>
            <div className='Cards'>
                <div className='Fraud'> 
                    <FaMoneyBillTransfer size={32} /><br></br>
                   Daily Transactions: <br></br>
                    {dailyTransactions}
                </div>
            </div>
            
            <div className='Cards'>
                <div className='NoofUsers'> 
                    <HiUsers size={32} /><br></br>
                    Users: <br></br>
                    {usersCount}
                </div>
            </div>
            <div className='Cards'>
                <div className='Fraud'> 
                    <MdMoneyOff size={32} /><br></br>
                    Fraudulent Transactions: <br></br>
                    {fraudulentTransactions}
                </div>
            </div>
        </div>
    );
}

export default Cards;
