import React, { useEffect, useState } from 'react';
import './AdminUsers.css';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';


const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'username', headerName: 'Username', width: 150 },
  { field: 'email', headerName: 'Email', width: 250 },
  { field: 'account_number', headerName: 'Account Number', width: 200 },
  { field: 'balance', headerName: 'Balance', type: 'number', width: 150 },
  { field: 'status', headerName: 'Status', width: 120 },
  {
      field: 'actions',
      headerName: 'Actions',
      width: 300,
      disableClickEventBubbling: true,
      renderCell: (params) => {
          const blockUser = async () => {
              const response = await fetch(`http://127.0.0.1:5000/api/admin/block-user/${params.row.username}`, {
                  method: 'PUT',
                  headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
              });
              if (response.ok) {
                  // Refresh data or handle UI updates here
              }
          };

          const unblockUser = async () => {
              const response = await fetch(`http://127.0.0.1:5000/api/admin/unblock-user/${params.row.username}`, {
                  method: 'PUT',
                  headers: {
                      'Authorization': `Bearer ${localStorage.getItem('token')}`
                  }
              });
              if (response.ok) {
                  // Refresh data or handle UI updates here
              }
          };

          const deleteUser = async () => {
              // Delete logic here
          };

          return (
              <div>
                  <button onClick={blockUser}>Block</button>
                  <button onClick={unblockUser}>Unblock</button>
                  <button onClick={deleteUser}>Delete</button>
              </div>
          );
      }
  }
];

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
      try {
          const response = await fetch('http://127.0.0.1:5000/api/admin/users', {
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
          });
          const data = await response.json();
          const usersWithIds = data.map(user => ({ ...user, id: user.username }));
          setUsers(usersWithIds);
      } catch (error) {
          console.error("Error fetching users:", error);
      }
  };
  

    const blockUser = async (username) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/admin/block-user/${username}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                setMessage('User blocked successfully.');
                fetchUsers();
            } else {
                const data = await response.json();
                setMessage(data.message || 'Error blocking user.');
            }
        } catch (error) {
            console.error("Error blocking user:", error);
        }
    };

    const unblockUser = async (username) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/admin/unblock-user/${username}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (response.ok) {
                setMessage('User unblocked successfully.');
                fetchUsers();
            } else {
                const data = await response.json();
                setMessage(data.message || 'Error unblocking user.');
            }
        } catch (error) {
            console.error("Error unblocking user:", error);
        }
    };

    const deleteUser = async (username) => {
        // Implement delete logic here
    };

    columns[columns.length - 1].renderCell = (params) => {
        return (
            <div>
                <button onClick={() => blockUser(params.row.username)}>Block</button>
                <button onClick={() => unblockUser(params.row.username)}>Unblock</button>
                <button onClick={() => deleteUser(params.row.username)}>Delete</button>
            </div>
        );
    };

    return (
        <div className='AdminUsers'>
            <h2>User Management</h2>
            <Box sx={{ height: 450, width: '93%' }}>
                <DataGrid
                    rows={users}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
            {message && <div className="feedback">{message}</div>}
        </div>
    );
}

export default AdminUsers;
