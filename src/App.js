// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import User from './components/User';
import AdminPanel from '../src/Admin/AdminPanel'
import PrivateRoute from './components/PrivateRoute';

function App() {
  // For simplicity, assume the user is logged in with this example user object


  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        {/* Use the <PrivateRoute> component for protected routes */}
        <Route element={<PrivateRoute/>}>
              <Route path='/User' element={<User/>} />
              <Route path='/AdminPanel' element = {<AdminPanel/>} />
              
          </Route>
      </Routes>
    
  );
}

export default App;
