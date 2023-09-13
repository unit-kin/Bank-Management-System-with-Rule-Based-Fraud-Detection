import React, { useState, useEffect } from 'react';
import './AdminNavbar.css';
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminNavbar = ({ onContentChange }) => {

    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        // Fetch user data here
        const token = localStorage.getItem('token');
        if (token) {
            axios.get('http://127.0.0.1:5000/api/user', {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(response => {
                if (response.data.is_admin) {
                    setAdmin(response.data);
                }
            })
            .catch(error => {
                console.error("Error fetching user data:", error);
            });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear the token on logout
        window.location = "/"; // Redirect to the '/' page
    };

    return (
        <div className="adTop-nav">
            {/* logo */}
            <Link className="adlogo-user" to="/">
                <img src="https://raw.githubusercontent.com/FesoQue/Easybank-landing-page/862ba75ea9d9c1f583baea94870720a316cf6659/images/logo.svg" alt="logo" />
            </Link>
  
            {/* navigations */}
            <ul className="adnav-item">
                <li className="adnav-list">
                    <button className="adnav-links" onClick={() => onContentChange('AdminDashboard')}>
                        Overview
                    </button>
                </li>
                <li className="adnav-list">
                    <button className="adnav-links" onClick={() => onContentChange('AdminFraudtransactions')}>
                        Fraud Transactions
                    </button>
                </li>

            </ul>

            {/* User name and Image */}
            <div className="adusername-mage">
                <Avatar spacing="4"></Avatar>
                <div className='profile'>
                    <p>{admin ? admin.username : 'username'}</p>
                    <p>Administrator</p>
                </div>
            </div>

            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default AdminNavbar;
