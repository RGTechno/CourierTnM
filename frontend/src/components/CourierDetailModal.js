import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
} from '@mui/material'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useSelector } from 'react-redux'
import { apiHost } from '../apiLoc'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function additionalTabWiseAttributes(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

function UserCard({ customer }) {
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          Name
        </Typography>
        <Typography component='div'>{customer.name}</Typography>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          Email
        </Typography>
        <Typography component='div'>{customer.email}</Typography>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          Phone
        </Typography>
        <Typography component='div'>{customer.phoneNumber}</Typography>
        <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
          Address
        </Typography>
        <Typography component='div'>
          {customer.location}, {customer.city}, {customer.state},{' '}
          {customer.country}, {customer.pincode}
        </Typography>
      </CardContent>
    </Card>
  )
}

const CourierDetailModal = (props) => {
  const auth = useSelector((state) => state.auth)
  const depId = auth.department._id
  const [value, setValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setValue(newValue)
  }


  const initValues = {
    item: props.data && props.data.item,
    weight: props.data && props.data.weight,
    status: props.data && props.data.status[`${depId}`],
  }

  const editCourierSchema = yup.object().shape({
    item: yup.string().required('required'),
    weight: yup.string().required('required'),
    status: yup.string().required('required'),
  })

  const handleCourierUpdateFormSubmit = async (formData) => {
    const data = {
      courierDetails: { ...formData, _id: props.data.id },
    }
    try {
      const url = `${apiHost}/api/couriers/updateCourier`
      const response = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${auth.accessToken}`,
        },
      })

      // const courierUpdateResponse = await response.json()

      if (response.status === 204) {
        toast.success('Updated Successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      } else {
        toast.error('Something went wrong !', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
      }
    } catch (error) {
      console.log(error)
    }
    props.handleModalClose()
  }

  return (
    <div>
      <Dialog open={props.modalOpen} onClose={props.handleModalClose}>
        <DialogTitle>Courier Details</DialogTitle>
        <Box>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleTabChange} centered>
              <Tab
                label='Package Details'
                {...additionalTabWiseAttributes(0)}
              />
              <Tab label='Sender Details' {...additionalTabWiseAttributes(1)} />
              <Tab
                label='Receiver Details'
                {...additionalTabWiseAttributes(2)}
              />
            </Tabs>
          </Box>

          <TabPanel value={value} index={0}>
            <Box>
              <Paper elevation={2} sx={{ px: 2, py: 1 }}>
                <Typography
                  sx={{ fontSize: 10 }}
                  color='text.secondary'
                  gutterBottom
                >
                  Reference ID
                </Typography>
                <Typography component='div' sx={{ fontSize: 12 }}>
                  {props.data && props.data.id}
                </Typography>
              </Paper>
              <Box mt={2}>
                <Formik
                  initialValues={initValues}
                  validationSchema={editCourierSchema}
                  onSubmit={handleCourierUpdateFormSubmit}
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
                          variant='standard'
                          type='text'
                          label='Item Description'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name='item'
                          value={values.item}
                          error={!!touched.item && !!errors.item}
                          helperText={touched.item && errors.item}
                          sx={{ gridColumn: 'span 2' }}
                        />
                        <TextField
                          fullWidth
                          variant='standard'
                          type='text'
                          label='Weight'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name='weight'
                          value={values.weight}
                          error={!!touched.weight && !!errors.weight}
                          helperText={touched.weight && errors.weight}
                          sx={{ gridColumn: 'span 2' }}
                        />
                      </Box>

                      <Box
                        display='grid'
                        gap='30px'
                        gridTemplateColumns='repeat(4, minmax(0, 1fr))'
                        marginTop={1}
                      >
                        <InputLabel id='status-label' sx={{ fontSize: 12 }}>
                          Status
                        </InputLabel>
                        <Select
                          labelId='status-label'
                          fullWidth
                          variant='standard'
                          type='text'
                          label='Status'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name='status'
                          value={values.status}
                          error={!!touched.status && !!errors.status}
                          helperText={touched.status && errors.status}
                          sx={{ gridColumn: 'span 4' }}
                        >
                          <MenuItem value={'Accepted'}>Accepted</MenuItem>
                          <MenuItem value={'Dispatched'}>Dispatched</MenuItem>
                          <MenuItem value={'Unsuccessful'}>
                            Unsuccessful
                          </MenuItem>
                        </Select>
                      </Box>
                      <Box display='flex' justifyContent='end' mt='20px'>
                        <Button
                          type='submit'
                          variant='contained'
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
            </Box>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <UserCard customer={props.data && props.data.sender} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <UserCard customer={props.data && props.data.receiver} />
          </TabPanel>
        </Box>
      </Dialog>
    </div>
  )
}

export default CourierDetailModal
