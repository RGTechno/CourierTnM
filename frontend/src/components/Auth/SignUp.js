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
    <Container maxWidth='s'>
      <Box
        sx={{
          paddingTop: 10,
          px: 10,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ fontSize: '20pt', fontWeight: 'bold' }}>
          Create an account !
        </div>
        <div style={{color:"grey",fontSize:"10pt"}}>Register into the world of automated deliveries</div>
        <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name='departmentName'
                variant='standard'
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
                variant='standard'
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
                variant='standard'
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
                variant='standard'
                name='phone'
                label='Phone'
                id='phone'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                variant='standard'
                fullWidth
                id='address'
                label='Address'
                name='address'
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                variant='standard'
                fullWidth
                name='country'
                label='Country'
                id='country'
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                variant='standard'
                fullWidth
                name='state'
                label='State'
                id='state'
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                required
                variant='standard'
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
                variant='standard'
                name='pincode'
                label='Pincode'
                id='pincode'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                variant='standard'
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
            sx={{
              mt: 3,
              mb: 2,
              color: 'white',
              backgroundColor: 'black',
              borderRadius: '20px',
            }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button
                fullWidth
                variant='text'
                sx={{
                  mt: 3,
                  borderRadius: '20px',
                  color: 'black',
                }}
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
