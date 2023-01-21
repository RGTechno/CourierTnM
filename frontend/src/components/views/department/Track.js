import React, { useState } from 'react'
import { Box, IconButton, TextField } from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { ToastContainer, toast } from 'react-toastify'
import TrackingRep from '../../TrackingRep'
import { useSelector } from 'react-redux'
import { apiHost } from '../../../apiLoc'

const Track = () => {
  const [refId, setRefId] = useState()
  const [tracker, setTracker] = useState()
  const [courierDetails, setCourierDetails] = useState()

  const token = useSelector((state) => state.auth.accessToken)

  const trackCourier = async () => {
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
      const url = `${apiHost}/api/couriers/track`
      const response = await fetch(url, {
        method: 'post',
        body: JSON.stringify({ _id: refId.trim() }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const trackingResponse = await response.json()
      if (response.status === 200) {
        setTracker(trackingResponse.data)
        setCourierDetails(trackingResponse.courierDetails)
        return
      }
      toast.error(trackingResponse.message, {
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
        <Box mr='10px'>
          {!token && (
            <img
              src='https://i.ibb.co/svJ55Td/Courier-Tn-M-removebg-preview.png'
              alt='Courier-Tn-M'
              height={75}
            />
          )}
        </Box>
        <TextField
          required
          value={refId}
          onChange={(event) => setRefId(event.target.value)}
          label='Reference ID'
          variant='standard'
          fullWidth
          placeholder='Enter reference id to track courier'
        />
        <IconButton
          onClick={trackCourier}
          sx={{
            backgroundColor: 'black',
            borderRadius: '50px',
            color: 'white',
            height: '40px',
            width: '40px',
            '&:hover': { backgroundColor: 'black' },
          }}
        >
          <SearchOutlinedIcon />
        </IconButton>
        <ToastContainer />
      </Box>
      {tracker == null ? (
        <div></div>
      ) : (
        <div>
          <TrackingRep trackingData={tracker} courierDetails={courierDetails} />
        </div>
      )}
    </Box>
  )
}

export default Track
