import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import AdminTransactions from './AdminTransactions';
import AdminUsers from './AdminUsers';
import AdminDashboard from './AdminDashboard';
import AdminNotifications from './AdminNotifications';
import AdminFraudtransactions from './AdminFraudtransactions';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
    const [currentContent, setCurrentContent] = useState('AdminDashboard');
    const [transactions, setTransactions] = useState({ data: [], isNew: false });
    const navigate = useNavigate();

    const handleContentChange = (contentName) => {
        setCurrentContent(contentName);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirect to login if token is not present
        }
    }, [navigate]); 

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/transactions', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                const isNewData = data.length > transactions.data.length;
                setTransactions({ data: data, isNew: isNewData });
            } catch (error) {
                console.error("Error fetching transactions:", error);
            }
        };

        fetchTransactions(); // fetch initially
        const intervalId = setInterval(fetchTransactions, 5000); // fetch every 5 seconds

        return () => clearInterval(intervalId); // cleanup the interval on component unmount
    }, [transactions.data.length]);

    const renderAdminContent = () => {
        switch (currentContent) {
            case 'AdminDashboard':
                return <AdminDashboard />;
            case 'AdminUsers':
                return <AdminUsers />;
            case 'AdminTransactions':
                return <AdminTransactions />;
            case 'AdminFraudtransactions':
                return <AdminFraudtransactions />;
            default:
                return <AdminDashboard />;
        }
    };

    return (
        <div className='AdminDashboard'>
            <div className='Navbarcontent'>
                <AdminNavbar onContentChange={handleContentChange} />
            </div>
            <div className='SideandContent'>
                <div className='Sidebarcontent'>
                    <AdminSidebar onContentChange={handleContentChange} />
                </div>
                <div className='Admincontent'>
                    {renderAdminContent()}
                </div>
                <div className='AdminNotifications'>
                    <h4>Recent Transactions</h4>
                
                <AdminNotifications transactions={transactions} />
                 </div>
            </div>
            
        </div>
    );
}

export default AdminPanel;
