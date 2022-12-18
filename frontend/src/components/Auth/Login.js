import React from 'react'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { useDispatch } from 'react-redux'
import { login } from '../../state/actions/authActions'

function Login(prop) {
  const dispatch = useDispatch()
  const handleLogin = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const registrationNumber = data.get('registrationNumber')
    const password = data.get('password')

    const credentials = {
      registrationNumber: registrationNumber,
      password: password,
    }

    dispatch(login(credentials))
  }

  return (
    <Container maxWidth='s'>
      <Box
        sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <Box component='form' onSubmit={handleLogin} sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            required
            fullWidth
            id='registrationNumber'
            label='Registration Number'
            name='registrationNumber'
            autoFocus
          />
          <TextField
            margin='normal'
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
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>
            <Grid item>
              <Button
                variant='text'
                onClick={() => prop.handleAuthToggle(true)}
              >
                Create an Account
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Login
