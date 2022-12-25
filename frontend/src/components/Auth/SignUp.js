import React from 'react'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { useDispatch } from 'react-redux'
import { register } from '../../state/actions/authActions'

function SignUp(prop) {
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = data.get('email')
    const password = data.get('password')
    const departmentName = data.get('departmentName')
    const registrationNumber = data.get('registrationNumber')
    const phone = data.get('phone')
    const address = data.get('address')
    const city = data.get('city')
    const state = data.get('state')
    const country = data.get('country')
    const pinCode = data.get('pincode')

    const details = {
      name: departmentName,
      country: country,
      pinCode: pinCode,
      state: state,
      city: city,
      password: password,
      contactNumber: phone,
      contactEmail: email,
      registrationNumber: registrationNumber,
      location: address,
    }

    dispatch(register(details))
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component='h1' variant='h5'>
          Sign up
        </Typography>
        <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name='departmentName'
                required
                fullWidth
                id='departmentName'
                label='Department Name'
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='registrationNumber'
                label='Registration Number'
                name='registrationNumber'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                name='phone'
                label='Phone'
                id='phone'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id='address'
                label='Address'
                name='address'
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                name='city'
                label='City'
                id='city'
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                name='state'
                label='State'
                id='state'
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                name='country'
                label='Country'
                id='country'
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                fullWidth
                name='pincode'
                label='Pincode'
                id='pincode'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type='password'
                name='password'
                label='Password'
                id='password'
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button
                variant='text'
                onClick={() => prop.handleAuthToggle(false)}
              >
                Already have an account? Login
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default SignUp
