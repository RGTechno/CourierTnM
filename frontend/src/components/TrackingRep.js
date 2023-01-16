import React from 'react'
import { Box, Stepper, Step, StepLabel, Typography } from '@mui/material'
import Moment from 'react-moment'

const TrackingRep = ({ trackingData }) => {
  const getSteps = () => {
    const steps = []
    for (const [date, department] of Object.entries(trackingData)) {
      const stepTrack = {
        date: new Date(Number(date)),
        department: department,
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
          <Step key={step.department._id}>
            <StepLabel
              optional={
                index === steps.length - 1 ? (
                  <Typography variant='caption'>
                    Arrived at {step.department.name},{' '}
                    {step.department.location}, {step.department.city}
                  </Typography>
                ) : (
                  <Typography variant='caption'>
                    Dispatched from {step.department.name},
                    {step.department.location}, {step.department.city}
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
