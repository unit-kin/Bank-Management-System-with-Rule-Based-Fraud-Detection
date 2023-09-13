import React, { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
import { IoNotificationsCircleOutline } from 'react-icons/io5';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'; // <-- Importing required components
import './User.css';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Transfer from './Transfer';
import Deposit from './Deposit';
import Withdraw from './Withdraw';
import MessageBox from './Table.tsx';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Navbar = ({ onLogout, username, handleContentChange }) => {
  return (
      <div className="Top-nav">
          {/* logo */}
          <Link className="logo-user" to="/">
              <img src="https://raw.githubusercontent.com/FesoQue/Easybank-landing-page/862ba75ea9d9c1f583baea94870720a316cf6659/images/logo.svg" alt="logo" />
          </Link>

          {/* navigations */}
          <ul className="nav-item">
              <li className="nav-list">
                  <button className="nav-links" onClick={() => handleContentChange('dashboard')}>
                      Overview
                  </button>
              </li>
              <li className="nav-list">
                  <button className="nav-links" onClick={() => handleContentChange('payments')}>
                      Payments
                  </button>
              </li>

          </ul>
          {/* User name and Image */}
          <div className="username-mage">
              <p>{username}</p>
              <Avatar spacing="4">{username.charAt(0)}</Avatar>
          </div>
          <div>
              <button onClick={onLogout}>Logout</button>
          </div>
      </div>
  );
};

const useTransactions = (onTransactionComplete, username) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchUserTransactions = async (token) => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/transactions', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching user transactions:', error);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      fetchUserTransactions(token);
    }
  }, [onTransactionComplete]);

  return transactions;
};

const Content = ({ balance, onTransactionComplete, username, currentContent, handleContentChange }) => {
  const transactions = useTransactions(onTransactionComplete, username);

  const columns = [
    { field: 'transactiontype', headerName: 'Transaction Type', width: 150 },
    { field: 'amount', headerName: 'Amount', width: 110, type: 'number' },
    { field: 'sender_username', headerName: 'Sender', width: 150 },
    { field: 'receiver_username', headerName: 'Receiver', width: 150 },
    {
      field: 'date',
      headerName: 'Date',
      width: 200,
      type: 'dateTime',
      valueGetter: (params) => new Date(params.value)
    }
    
  ];
  
  const rows = transactions.map((t, index) => ({
    id: index,
    transactiontype: t.transactiontype,
    amount: Number(t.amount),
    sender_username: t.sender_username,
    receiver_username: t.receiver_username,
    date: t.date,
  }));

  // Function to render the appropriate content based on the currentContent state
  const renderContent = () => {
    switch (currentContent) {
      case 'dashboard':
        return <Dashboard />;
      case 'transfer':
        return <Transfer onTransactionComplete={onTransactionComplete} />;
      case 'withdraw':
        return <Withdraw onTransactionComplete={onTransactionComplete} />;
      case 'deposit':
        return <Deposit onTransactionComplete={onTransactionComplete} />;
      case 'payments':
        return (
          <div className='Transactiondata'>
                      <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5, 10, 20]}
              components={{
                Toolbar: GridToolbar,
              }}
            />
          </div>

          </div>

        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="Content">
      <Sidebar handleContentChange={handleContentChange} />
      <div className="content-container">{renderContent()}</div>
      <div className='Balance'>
        <p>Your Balance</p>
        <p>KSH {balance}</p>
      </div>
    </div>
  );
};


const Notification = ({ username, onTransactionComplete }) => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchUserTransactions = async (token) => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/transactions', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // Check if more than a week has passed since last cleared
        const lastCleared = parseInt(localStorage.getItem("lastCleared"), 10);
        const oneWeek = 7 * 24 * 60 * 60 * 1000;  // One week in milliseconds
        if (Date.now() - lastCleared > oneWeek) {
            // Clear the transactions from the state
            setTransactions([]);
            
            // Update the last cleared time in local storage
            localStorage.setItem("lastCleared", Date.now().toString());
        } else {
            setTransactions(data);
        }

      } catch (error) {
        console.error('Error fetching user transactions:', error);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      fetchUserTransactions(token);
    }

    // Check if "lastCleared" is present in localStorage
    if (!localStorage.getItem("lastCleared")) {
        localStorage.setItem("lastCleared", Date.now().toString());
    }
    
  }, [onTransactionComplete]);

  return (
    <div className="Notifications">
      <p>Your Notifications</p>
      ...
      <div className="NotificationTable">
        <MessageBox transactions={transactions} username={username} />
      </div>
    </div>
  );
};




const Footer = () => {
  return (
    <footer>
      <div className="footer-items container">
        <div className="ftr-item-1">
          <div className="ftr-logo">
            <img src="https://raw.githubusercontent.com/FesoQue/Easybank-landing-page/862ba75ea9d9c1f583baea94870720a316cf6659/images/logo-white.svg" alt="logo" />
          </div>
          <div className="social">
            <a href="#" title="facebook">
              <img src="https://raw.githubusercontent.com/FesoQue/Easybank-landing-page/862ba75ea9d9c1f583baea94870720a316cf6659/images/icon-facebook.svg" alt="facebook" />
            </a>
            <a href="#" title="youtube">
              <img src="https://raw.githubusercontent.com/FesoQue/Easybank-landing-page/862ba75ea9d9c1f583baea94870720a316cf6659/images/icon-youtube.svg" alt="youtube" />
            </a>
            <a href="#" title="twitter">
              <img src="https://raw.githubusercontent.com/FesoQue/Easybank-landing-page/862ba75ea9d9c1f583baea94870720a316cf6659/images/icon-twitter.svg" alt="twitter" />
            </a>
            <a href="#" title="pinterest">
              <img src="https://raw.githubusercontent.com/FesoQue/Easybank-landing-page/862ba75ea9d9c1f583baea94870720a316cf6659/images/icon-pinterest.svg" alt="pinterest" />
            </a>
            <a href="#" title="instagram">
              <img src="https://raw.githubusercontent.com/FesoQue/Easybank-landing-page/862ba75ea9d9c1f583baea94870720a316cf6659/images/icon-instagram.svg" alt="instagram" />
            </a>
          </div>
        </div>

        <div className="ftr-item-2">
          <ul className="ftr-nav nav-1">
            <li className="nav-list"><a href="#">About Us</a></li>
            <li className="nav-list"><a href="#">Contact</a></li>
            <li className="nav-list"><a href="#">Blog</a></li>
          </ul>
          <ul className="ftr-nav nav-2">
            <li className="nav-list"><a href="#">Careers</a></li>
            <li className="nav-list"><a href="#">Support</a></li>
            <li className="nav-list"><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="ftr-item-3">
          <div className="btn cta-3">
            <a href="#" className="cta-btn">Request Invite</a>
          </div>
          <div className="copyright">
            <p>Easybank. all rights reserved <span className="date"></span></p>
          </div>
        </div>
      </div>
    </footer>
  );
};


function User() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [username, setUsername] = useState('');
  const [balance, setBalance] = useState(0);
  const [currentContent, setCurrentContent] = useState('Dashboard'); // Moved this state up

  const handleContentChange = (content) => {
    setCurrentContent(content); // Directly update the currentContent state
  };

  const fetchUserBalance = async (token) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/balance', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setBalance(data.balance);
    } catch (error) {
      console.error('Error fetching user balance:', error);
    }
  };
  
  const handleTransaction = () => {
      const token = localStorage.getItem('token');
      if (token) {
          fetchUserBalance(token);
      }
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem('token'); // Clear the token on logout
    navigate('/');
  };

  const fetchUserData = async (token) => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/user', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      setUsername(data.username);
      fetchUserBalance(token); // Fetch the balance after getting user data
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserData(token);
    }
  }, []);

  return (
    <div className="user">
        <Navbar onLogout={handleLogout} username={username} handleContentChange={handleContentChange} />
        <div className="user-body">
            <Content balance={balance} onTransactionComplete={handleTransaction} currentContent={currentContent} handleContentChange={handleContentChange} />
            <Notification username={username} onTransactionComplete={handleTransaction} />
        </div>
        <Footer />
    </div>
);
}

export default User;

