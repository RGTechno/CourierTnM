import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDepartmentInfo } from '../state/actions/authActions'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './Sidebar'
import Dashboard from './Dashboard'
import Profile from './Profile'

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
              <Route exact path='/' element={<Dashboard />} />
              <Route exact path='/profile' element={<Profile />} />
            </Routes>
          </main>
        </div>
      )}
    </>
  )
}

export default Main
