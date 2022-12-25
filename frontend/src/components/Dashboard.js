import { Button } from '@mui/material'
import React from 'react'
import Sidebar from './Sidebar'

const Dashboard = () => {
  return (
    <div className='app'>
      <Sidebar />
      <main className='main'></main>
    </div>
  )
}

export default Dashboard
