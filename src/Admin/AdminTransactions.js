import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid'; // <-- Importing required components
import './AdminTransactions.css';

const AdminTransactions = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchAllTransactions = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/transactions', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const data = await response.json();
                setTransactions(data);
            } catch (error) {
                console.error("Error fetching all transactions:", error);
            }
        };

        fetchAllTransactions();
    }, []);

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

    return (
        <div className='AdminTransactions'>
            <h2>All Transactions</h2>
            <div style={{ height: 450, width: '93%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 20]}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                />
            </div>
        </div>
    );
}

export default AdminTransactions;
