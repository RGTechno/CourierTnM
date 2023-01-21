import React, { useState } from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined'
import { ToastContainer, toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { apiHost } from '../../../apiLoc'

const Delivery = () => {
  const [refId, setRefId] = useState()
  const accessToken = useSelector((state) => state.auth.accessToken)
  const markAsDelivered = async () => {
    if (!refId || refId.trim().length === 0) {
      toast.error('Enter valid reference ID', {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
      return
    }
    try {
      const url = `${apiHost}/api/deliveryAgents/markCourierAsDelivered`
      const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify({ _id: refId }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })

      const pickupResponse = await response.json()
      if (response.status === 200) {
        toast.success('Delivered Successfully', {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        setRefId('')
        return
      }
      toast.error(pickupResponse.message, {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Box m='20px'>
      <Box display={'flex'} justifyContent='space-evenly' alignItems={'center'}>
        <TextField
          required
          value={refId}
          onChange={(event) => setRefId(event.target.value)}
          label='Courier Reference ID'
          variant='standard'
          fullWidth
          placeholder='Enter courier reference id to mark as delivered'
        />
        <IconButton
          onClick={markAsDelivered}
          sx={{
            backgroundColor: 'black',
            borderRadius: '50px',
            color: 'white',
            height: '40px',
            width: '40px',
            '&:hover': { backgroundColor: 'black' },
          }}
        >
          <DoneAllOutlinedIcon />
        </IconButton>
        <ToastContainer />
      </Box>
    </Box>
  )
}

export default Delivery
