import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartmentInfo } from '../state/actions/authActions'
import { Navigate, Route, Routes } from 'react-router-dom'
import Sidebar from './Sidebar'
import Dashboard from './views/Dashboard'
import Profile from './views/Profile'
import Couriers from './views/Couriers'

function Main() {
  const dispatch = useDispatch()
  const state = useSelector((state) => state)

  useEffect(() => {
    dispatch(getDepartmentInfo(state.auth.accessToken))
  }, [state.auth.accessToken])

  return (
    <>
      {state.auth.department == null ? (
        <>LOADING...</>
      ) : (
        <div className='app'>
          <Sidebar />
          <main className='content'>
            <Routes>
              <Route exact path='/dashboard' element={<Dashboard />} />
              <Route exact path='/profile' element={<Profile />} />
              <Route exact path='/couriers' element={<Couriers />} />
              <Route path='*' element={<Navigate to='/dashboard' replace />} />
            </Routes>
          </main>
        </div>
      )}
    </>
  )
}

export default Main
