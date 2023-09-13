import React from 'react';
import './AdminSidebar.css';
import { BiSolidDashboard } from 'react-icons/bi';
import { HiUsers } from 'react-icons/hi';
import { FaMoneyBillTransfer } from 'react-icons/fa6';
import FraudNotifications from './FraudNotifications';

const AdminSidebar = ({ onContentChange }) => {
    return (
        <>
        <div className='AdSide-nav'>
            <div className='Adside-container'>
                <div className='Adside-option '>
                    <BiSolidDashboard size={32} />
                    <button onClick={() => onContentChange('AdminDashboard')}>Dashboard</button>
                </div>
                <div className='Adside-option '>
                    <HiUsers size={32} />
                    <button onClick={() => onContentChange('AdminUsers')}>Users</button>
                </div>
                <div className='Adside-option '>
                    <FaMoneyBillTransfer  size={32} />
                    <button onClick={() => onContentChange('AdminTransactions')}>Transactions</button>
                </div>
            </div>
            <div className='Fraud-Notifications'>
                
                <FraudNotifications/>
            </div>
        </div>
        </>
    );
};

export default AdminSidebar;
