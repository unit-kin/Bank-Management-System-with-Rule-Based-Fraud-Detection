import React,{useState}from 'react';
import axios from 'axios';
import './Transfer.css';

const Transfer = (props) => {
    const [senderAccount, setSenderAccount] = useState('');
    const [receiverAccount, setReceiverAccount] = useState('');
    const [amount, setAmount] = useState('');
  
    const handleTransfer = async (e) => {
      e.preventDefault();

      // Confirmation prompt
      const userConfirmed = window.confirm("Are you sure you want to transfer this amount?");
      if (!userConfirmed) {
          console.warn("User canceled the transfer.");
          return;
      }
    
      // Get the JWT token from local storage
      const token = localStorage.getItem('token');
    
      try {
        // Send the transfer request with the authorization header
        const response = await axios.post(
          'http://127.0.0.1:5000/api/transfer',
          {
            receiverAccount,
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
        setReceiverAccount('');
        setAmount('');

        // Notify parent component that transaction was completed
        if (response.data.message === "Transfer successful") {
            props.onTransactionComplete();  // <-- Add this line
        } 
    
      } catch (error) {
        console.error('Error during transfer:', error.message);
        // Handle the error and display an error message to the user if needed
      }
    };
  
    return (
      <div className="transfer-content">
        <h2>Transfer Money</h2>
        <form onSubmit={handleTransfer}>
  
          <label htmlFor="receiver">Receiver Account:</label>
          <input
            type="text"
            id="receiver"
            value={receiverAccount}
            onChange={(e) => setReceiverAccount(e.target.value)}
          />
  
          <label htmlFor="amount">Amount:</label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
  
          <button type="submit">Transfer</button>
        </form>
      </div>
    );
  };
export default Transfer;
