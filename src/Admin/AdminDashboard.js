import React from 'react'
import './AdminDashboard.css'
import Cards from './Cards'
import AdminAnalytics from './AdminAnalytics'

const AdminDashboard = () => {
  return (
    <div className='AdminDashboard'> 
    <div className='Cardzz'>
      <Cards/>
    </div>
    <div className='AdminPieChart' >
     <AdminAnalytics/>
    </div>
    </div>
  )
}

export default AdminDashboard