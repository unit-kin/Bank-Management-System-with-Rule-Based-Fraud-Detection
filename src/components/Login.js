import React, { useState } from 'react';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom'; // Import useNavigate

import './Login.css';

const Login = () => {
  const [currentView, setCurrentView] = useState('signUp');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Hook for navigation

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/api/register', { username, email, password });
      console.log(response.data);
    } catch (error) {
      console.error('Error registering user:', error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://127.0.0.1:5000/api/login', { username, password });
        const token = response.data.token; // Extract the token from the response
        const isAdmin = response.data.is_admin; // Extract the is_admin value
        
        localStorage.setItem('token', token); // Store the token in local storage
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + token; // Set the default header for axios
        
        if (isAdmin) {
            navigate('/AdminPanel'); // Redirect to the AdminPanel if the user is an admin
        } else {
            navigate('/User'); // Otherwise, redirect to the User page
        }
        
    } catch (error) {
        if (error.response && error.response.status === 403) {
            // Handle the forbidden error
            console.error('You are not authorized to perform this action.');
        } else {
            console.error('Error logging in:', error.message);
        }
    }
};

  
  

  const renderCurrentView = () => {
    switch (currentView) {
      case 'signUp':
        return (
          <form onSubmit={handleSignUp}>
            <h2>Sign Up!</h2>
            <fieldset>
              <legend>Create Account</legend>
              <ul>
                <li>
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </li>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </li>
              </ul>
            </fieldset>
            <button>Submit</button>
            <button type="button" onClick={() => handleViewChange('logIn')}>
              Have an Account?
            </button>
          </form>
        );
      case 'logIn':
        return (
          <form onSubmit={handleLogin}>
            <h2>Welcome Back!</h2>
            <fieldset>
              <legend>Log In</legend>
              <ul>
                <li>
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </li>
                <li>
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </li>
                <li>
                  <i />
                  <a onClick={() => handleViewChange('PWReset')} href="#">
                    Forgot Password?
                  </a>
                </li>
              </ul>
            </fieldset>
            <button onClick={handleLogin}>Login</button>
            <button type="button" onClick={() => handleViewChange('signUp')}>
              Create an Account
            </button>
          </form>
        );
      case 'PWReset':
        return (
          <form>
            <h2>Reset Password</h2>
            <fieldset>
              <legend>Password Reset</legend>
              <ul>
                <li>
                  <em>A reset link will be sent to your inbox!</em>
                </li>
                <li>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" required />
                </li>
              </ul>
            </fieldset>
            <button>Send Reset Link</button>
            <button type="button" onClick={() => handleViewChange('logIn')}>
              Go Back
            </button>
          </form>
        );
      default:
        return null;
    }
  };

  return (
    <section id="entry-page">
      {renderCurrentView()}
    </section>
  );
};

export default Login;
