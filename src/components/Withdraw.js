import React, {useState} from 'react';
import axios from 'axios';
import './Withdraw.css';

const Withdraw = (props) => {
    const [account, setAccount] = useState('');
    const [amount, setAmount] = useState('');
  
    const handleWithdraw = async (e) => {
      e.preventDefault();

      // Confirmation prompt
      const userConfirmed = window.confirm("Are you sure you want to withdraw this amount?");
      if (!userConfirmed) {
          console.warn("User canceled the withdrawal.");
          return;
      }
      
      // Get the JWT token from local storage
      const token = localStorage.getItem('token');
    
      try {
        // Send the withdrawal request with the authorization header
        const response = await axios.post(
          'http://127.0.0.1:5000/api/withdraw',
          {
            accountNumber: account,
            amount: parseFloat(amount),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the JWT token
            },
          }
        );
    
        // Handle the response (e.g., display a success message)
        console.log(response.data.message);
    
        // Clear the form
        setAccount('');
        setAmount('');

            // Notify parent component that transaction was completed
            if (response.data.message === "Withdrawal successful") {
              props.onTransactionComplete();  // <-- Add this line
            }
    
      } catch (error) {
        console.error('Error during withdrawal:', error.message);
        // Handle the error and display an error message to the user if needed
      }
    };
    
    return (
      <div className="withdraw-content">
        <h2>Withdraw Money</h2>
        <form onSubmit={handleWithdraw}>
          <label htmlFor="account">Account Number:</label>
          <input
            type="text"
            id="account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
  
          <label htmlFor="amount">Amount:</label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
  
          <button type="submit">Withdraw</button>
        </form>
      </div>
    );
  };

export default Withdraw;
