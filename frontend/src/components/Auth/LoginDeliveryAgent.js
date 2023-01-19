import React from 'react'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'

import { useDispatch, useSelector } from 'react-redux'
import { loginDeliveryAgent } from '../../state/actions/authActions'
import { Link } from 'react-router-dom'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function LoginDeliveryAgent() {
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const handleLogin = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email')
    const password = data.get('password')

    const credentials = {
      email: email,
      password: password,
    }

    dispatch(loginDeliveryAgent(credentials))
  }

  return (
    <Box>
      <Box display={'flex'} justifyContent='end' marginRight={3}>
        <Link to='/auth'>
          <Button
            variant='contained'
            sx={{
              mt: 1,
              borderRadius: '20px',
              color: 'white',
              backgroundColor: 'black',
            }}
          >
            I'm a courier department
          </Button>
        </Link>
      </Box>
      <Grid container>
        {/* Login or Signup */}
        <Grid item xs={6}>
          <Box id='authForm'>
            <Container maxWidth='s'>
              <Box
                sx={{
                  padding: 10,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  id='loginText'
                  style={{ fontSize: '20pt', fontWeight: 'bold' }}
                >
                  Hey! Welcome
                </div>
                <div style={{ color: 'grey', fontSize: '10pt' }}>
                  Login to deliver with ease
                </div>
                <Box component='form' onSubmit={handleLogin} sx={{ mt: 1 }}>
                  <TextField
                    margin='normal'
                    variant='standard'
                    required
                    fullWidth
                    id='email'
                    label='Email'
                    name='email'
                    autoFocus
                  />
                  <TextField
                    margin='normal'
                    variant='standard'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                  />
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{
                      mt: 3,
                      mb: 2,
                      borderRadius: '20px',
                      color: 'white',
                      backgroundColor: 'black',
                    }}
                  >
                    Login
                  </Button>
                </Box>
              </Box>
            </Container>
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
  )
}

export default LoginDeliveryAgent
