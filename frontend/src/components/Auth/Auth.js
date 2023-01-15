import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Login from './Login'
import SignUp from './SignUp'
import './styles/auth.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Box, Grid } from '@mui/material'
import { Navigate, Route, Routes } from 'react-router-dom'
import Track from '../views/Track'

const Auth = () => {
  const auth = useSelector((state) => state.auth)
  const [isLogin, setIsLogin] = useState(true)
  function changeAuthType(current) {
    setIsLogin(!current)
  }

  return (
    <div className='authRoot'>
      <Routes>
        <Route
          exact
          path='/auth'
          element={
            <Grid container>
              {/* Login or Signup */}
              <Grid item xs={6}>
                <Box id='authForm'>
                  {isLogin ? (
                    <Login handleAuthToggle={changeAuthType} />
                  ) : (
                    <SignUp handleAuthToggle={changeAuthType} />
                  )}
                  {auth.accessToken === null && auth.error != null && (
                    <ToastContainer autoClose={5000} />
                  )}
                </Box>
              </Grid>
              {/* Intro Landing */}
              <Grid item xs={6} bgcolor={'blue'}></Grid>
            </Grid>
          }
        ></Route>
        <Route exact path='/courier/track' element={<Track />} />

        <Route path='*' element={<Navigate to='/auth' replace />} />
      </Routes>
    </div>
  )
}

export default Auth
