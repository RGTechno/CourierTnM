import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Login from './Login'
import SignUp from './SignUp'
// import './styles/auth.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Box, Button, Grid } from '@mui/material'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import Track from '../views/department/Track'
import LoginDeliveryAgent from './LoginDeliveryAgent'

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
            <Box>
              <Box display={'flex'} justifyContent='end' marginRight={3}>
                <Link to='/auth/deliveryAgent'>
                  <Button
                    variant='contained'
                    sx={{
                      mt: 1,
                      borderRadius: '20px',
                      color: 'white',
                      backgroundColor: 'black',
                    }}
                  >
                    I'm a delivery agent
                  </Button>
                </Link>
              </Box>
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
                <Grid item xs={6} marginTop={12}>
                  <img
                    src='https://i.ibb.co/svJ55Td/Courier-Tn-M-removebg-preview.png'
                    alt='Courier-Tn-M'
                  />
                </Grid>
              </Grid>
            </Box>
          }
        ></Route>
        <Route
          exact
          path='/auth/deliveryAgent'
          element={<LoginDeliveryAgent />}
        />
        <Route exact path='/track/courier' element={<Track />} />

        <Route path='*' element={<Navigate to='/auth' replace />} />
      </Routes>
    </div>
  )
}

export default Auth
