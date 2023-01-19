import React, { useEffect, useState } from 'react'
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material'
import Moment from 'react-moment'

const TrackingRep = ({ trackingData, courierDetails }) => {
  console.log(courierDetails)

  const getSteps = () => {
    const steps = []
    for (const [date, department] of Object.entries(trackingData)) {
      const stepTrack = {
        date: new Date(Number(date)),
        currentHand: department,
      }
      steps.push(stepTrack)
    }
    if (courierDetails.deliveryAgent) {
      const stepTrack = {
        date: courierDetails.pickupDate,
        currentHand: courierDetails.deliveryAgent,
      }
      steps.push(stepTrack)
    }
    if (courierDetails.status === 'Delivered') {
      const stepTrack = {
        date: courierDetails.deliveredDate,
        currentHand: 'Delivered',
      }
      steps.push(stepTrack)
    }
    return steps
  }

  const steps = getSteps()

  return (
    <Box sx={{}}>
      <Stepper activeStep={-1} orientation='vertical'>
        {steps.map((step, index) => (
          <Step key={step.currentHand._id}>
            <StepLabel
              optional={
                index === steps.length - 1 ? (
                  step.currentHand === 'Delivered' ? (
                    <Typography variant='caption'>Delivered</Typography>
                  ) : courierDetails.deliveryAgent != null ? (
                    <Typography variant='caption'>
                      Out of delivery, Delivery agent - {step.currentHand.name},{' '}
                      {step.currentHand.phoneNumber}
                    </Typography>
                  ) : (
                    <Typography variant='caption'>
                      Arrived at {step.currentHand.name},{' '}
                      {step.currentHand.location}, {step.currentHand.city}
                    </Typography>
                  )
                ) : index === steps.length - 2 ? (
                  courierDetails.deliveryAgent != null &&
                  courierDetails.status === 'Delivered' ? (
                    <Typography variant='caption'>
                      Out of delivery, Delivery agent - {step.currentHand.name},{' '}
                      {step.currentHand.phoneNumber}
                    </Typography>
                  ) : (
                    <Typography variant='caption'>
                      Dispatched from {step.currentHand.name},
                      {step.currentHand.location}, {step.currentHand.city}
                    </Typography>
                  )
                ) : (
                  <Typography variant='caption'>
                    Dispatched from {step.currentHand.name},
                    {step.currentHand.location}, {step.currentHand.city}
                  </Typography>
                )
              }
            >
              <Moment format='D MMM YYYY hh:mm a'>{step.date}</Moment>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

export default TrackingRep
