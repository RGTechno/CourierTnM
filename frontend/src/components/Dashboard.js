import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartmentInfo } from '../state/actions/authActions'

const Dashboard = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)

  useEffect(() => {
    dispatch(getDepartmentInfo(state.auth.accessToken))
  }, [state.auth.accessToken])

  return state.auth.department == null ? (
    <>LOADING...</>
  ) : (
    <div className='app'>
      <Sidebar />
      <main className='main'></main>
    </div>
  )
}

export default Dashboard
