import React from 'react'
import './Sidebar.css'
import {BiSolidDashboard, BiMoneyWithdraw, BiTransferAlt} from 'react-icons/bi'
import {RiLuggageDepositFill} from 'react-icons/ri'

const Sidebar = ({ handleContentChange }) => {
    return(
      <div className='Side-nav'>
        <div className='side-container'>
        <div className='side-option '>
          <BiSolidDashboard size={32}/> <button onClick={() => handleContentChange('dashboard')}>Dashboard</button>
        </div>
        <div className='side-option '>
          <BiTransferAlt size={32}/> <button onClick={() => handleContentChange('transfer')}>Transfer</button>
        </div>
        <div className='side-option '>
          <RiLuggageDepositFill size={32}/> <button onClick={() => handleContentChange('deposit')}>Deposit</button>
        </div>
        <div className='side-option '>
          <BiMoneyWithdraw size={32}/> <button onClick={() => handleContentChange('withdraw')}>Withdraw</button>
        </div>
      </div>

  
      </div>
    )
  };
  

export default Sidebar