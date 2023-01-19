import { Box, Button, TextField } from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { updateDepartmentInfo } from '../../../state/actions/authActions'

const Profile = () => {
  const departmentInitialValues = useSelector((state) => state.auth.department)
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  const handleFormSubmit = (updatedDepartmentValue) => {
    dispatch(
      updateDepartmentInfo(state.auth.accessToken, updatedDepartmentValue)
    )
  }

  const phoneRegExp = /^[6-9]\d{9}$/

  const checkoutSchema = yup.object().shape({
    name: yup.string().required('required'),
    registrationNumber: yup.string().required('required'),
    contactEmail: yup.string().email('invalid email').required('required'),
    contactNumber: yup
      .string()
      .matches(phoneRegExp, 'Phone number is not valid')
      .required('required'),
    location: yup.string().required('required'),
    country: yup.string().required('required'),
    state: yup.string().required('required'),
    city: yup.string().required('required'),
    pinCode: yup.number().required('required'),
  })

  return (
    <Box m='20px'>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={departmentInitialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display='grid'
              gap='30px'
              gridTemplateColumns='repeat(4, minmax(0, 1fr))'
            >
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Name'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.name}
                name='name'
                error={!!touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                disabled={true}
                label='Registration Number'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.registrationNumber}
                name='registrationNumber'
                error={
                  !!touched.registrationNumber && !!errors.registrationNumber
                }
                helperText={
                  touched.registrationNumber && errors.registrationNumber
                }
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Email'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contactEmail}
                name='contactEmail'
                error={!!touched.contactEmail && !!errors.contactEmail}
                helperText={touched.contactEmail && errors.contactEmail}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Contact Number'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.contactNumber}
                name='contactNumber'
                error={!!touched.contactNumber && !!errors.contactNumber}
                helperText={touched.contactNumber && errors.contactNumber}
                sx={{ gridColumn: 'span 2' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Location'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.location}
                name='location'
                error={!!touched.location && !!errors.location}
                helperText={touched.location && errors.location}
                sx={{ gridColumn: 'span 4' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Country'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.country}
                name='country'
                error={!!touched.country && !!errors.country}
                helperText={touched.country && errors.country}
                sx={{ gridColumn: 'span 1' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='State'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.state}
                name='state'
                error={!!touched.state && !!errors.state}
                helperText={touched.state && errors.state}
                sx={{ gridColumn: 'span 1' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='City'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.city}
                name='city'
                error={!!touched.city && !!errors.city}
                helperText={touched.city && errors.city}
                sx={{ gridColumn: 'span 1' }}
              />
              <TextField
                fullWidth
                variant='filled'
                type='text'
                label='Pincode'
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.pinCode}
                name='pinCode'
                error={!!touched.pinCode && !!errors.pinCode}
                helperText={touched.pinCode && errors.pinCode}
                sx={{ gridColumn: 'span 1' }}
              />
            </Box>
            <Box display='flex' justifyContent='end' mt='20px'>
              <Button
                type='submit'
                variant='contained'
                disabled={values === departmentInitialValues}
                sx={{
                  color: 'white',
                  backgroundColor: 'black',
                  borderRadius: '20px',
                }}
              >
                Update
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  )
}

export default Profile
