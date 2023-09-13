import React, { useState } from 'react';
import axios from 'axios';
import './Deposit.css';

const Deposit = (props) => {
  const [accountNumber, setAccountNumber] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [message, setMessage] = useState('');
  const [cancelCounter, setCancelCounter] = useState(0);

  const handleDeposit = async (e) => {
    e.preventDefault();

    // Confirmation prompt
    const userConfirmed = window.confirm("Are you sure you want to deposit this amount?");
    if (!userConfirmed) {
        console.warn("User canceled the deposit.");
        return;
    }

    try {
      // Get the JWT token from local storage
      const token = localStorage.getItem('token');

      // Make the deposit API request with the authorization header
      const response = await axios.post(
        'http://127.0.0.1:5000/api/deposit',
        {
          accountNumber,
          amount: parseFloat(depositAmount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token
          },
        }
      );

      // Display a success message if the deposit was successful
      console.log(response.data.message); // Should print "Deposit successful"

      // Clear the form
      setAccountNumber('');
      setDepositAmount('');

      // Notify parent component that transaction was completed
      if (response.data.message === "Deposit successful") {
        props.onTransactionComplete();
      } 

    } catch (error) {
      console.error('Error depositing:', error.message);
      // Handle the error and display an error message to the user if needed
    }
  };

  return (
    <div className="deposit-content">
      <h2>Deposit Money</h2>
      <form onSubmit={handleDeposit}>
        <label htmlFor="account">Account Number:</label>
        <input
          type="text"
          id="account"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />

        <label htmlFor="amount">Amount:</label>
        <input
          type="text"
          id="amount"
          value={depositAmount}
          onChange={(e) => setDepositAmount(e.target.value)}
        />

        <button type="submit">Deposit</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Deposit;
