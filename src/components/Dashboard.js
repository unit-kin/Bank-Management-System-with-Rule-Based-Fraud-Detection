import React from 'react'
import './Dashboard.css'
import Linechart from './Linechart'

function Dashboard() {
  return (
    <div className= 'Dashboard' style={{height: 400, width:500}}>
        <Linechart/>
    </div>
  )
}

export default Dashboard