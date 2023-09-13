// PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Replace 'your-secret-key' with your actual secret key used for JWT token generation
  const jwtSecretKey = 'eyJ1c2VybmFtZSI6IkFsdmluIiwiaWF0IjoxNjkwNzA4MTUwLCJleHAiOjE2OTA3MTE3NTB9';

  // Get the JWT token from localStorage or wherever it's stored after login
  const token = localStorage.getItem('jwtToken');

  // Verify the JWT token
  try {
    // If the token is valid and not expired, render the protected content
    // Nested routes inside the protected route will be rendered through the <Outlet>
    return <Outlet />;
  } catch (error) {
    // If the token is invalid or expired, redirect to the login page
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
