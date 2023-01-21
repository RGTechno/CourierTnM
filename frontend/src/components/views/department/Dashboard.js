import React from 'react'
import { Box, Card, CardContent, Chip, Paper, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import BarChartIcon from '@mui/icons-material/BarChart'
import FunctionsIcon from '@mui/icons-material/Functions'
import DoneIcon from '@mui/icons-material/Done'
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import { PieChart } from 'react-minimal-pie-chart'

const Dashboard = () => {
  const couriers = useSelector((state) => state.courier.couriers)
  const depId = useSelector((state) => state.auth.department._id)

  function getRecentUpdates() {
    const updates = []
    couriers.map((courier, index) => {
      const currentDate = new Date()
      const courierUpdateDate = new Date(courier.updatedAt)
      if (
        courierUpdateDate.getDate() === currentDate.getDate() &&
        courierUpdateDate.getMonth() === currentDate.getMonth() &&
        courierUpdateDate.getFullYear() === currentDate.getFullYear()
      ) {
        updates.push(courier)
      }
    })
    return updates
  }
  const recentUpdates = getRecentUpdates()

  function getAcceptedCouriers() {
    const acceptedCouriers = []
    couriers.map((courier, index) => {
      if (courier.departmentStatus[depId] === 'Accepted') {
        acceptedCouriers.push(courier)
      }
    })
    return acceptedCouriers
  }
  function getDispatchedCouriers() {
    const dispatchedCouriers = []
    couriers.map((courier, index) => {
      if (courier.departmentStatus[depId] === 'Dispatched') {
        dispatchedCouriers.push(courier)
      }
    })
    return dispatchedCouriers
  }
  function getUnsuccessfulCouriers() {
    const unsuccessfulCouriers = []
    couriers.map((courier, index) => {
      if (courier.departmentStatus[depId] === 'Unsuccessful') {
        unsuccessfulCouriers.push(courier)
      }
    })
    return unsuccessfulCouriers
  }

  const acceptedCouriers = getAcceptedCouriers()
  const dispatchedCouriers = getDispatchedCouriers()
  const unsuccessfulCouriers = getUnsuccessfulCouriers()

  return (
    <Box m='20px'>
      <Typography variant='subtitle1' fontWeight={'bold'} mb={2}>
        Recent Updates
      </Typography>
      {recentUpdates.length === 0 ? (
        <Typography variant='subtitle2'>No updates for today</Typography>
      ) : (
        recentUpdates.map((courier, index) => {
          return (
            <Card key={index}>
              <CardContent>
                <Box
                  display={'flex'}
                  justifyContent='space-between'
                  alignItems={'center'}
                >
                  <Box>
                    <Typography variant='subtitle2' fontWeight={'bold'}>
                      Courier to {courier.receiverDetails.name} -{' '}
                      {courier.packageName}
                    </Typography>
                    <Typography
                      variant='caption'
                      fontWeight={'bold'}
                      fontSize='7pt'
                    >
                      Reference ID: {courier._id}
                    </Typography>
                  </Box>
                  <Box border={'solid grey 1px'} sx={{ px: 1 }}>
                    <Typography variant='caption'>
                      Status: {courier.departmentStatus[depId]}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )
        })
      )}
      <Typography variant='subtitle1' fontWeight={'bold'} mt={5}>
        Delivery Stats
      </Typography>
      <Box
        display={'flex'}
        justifyContent='space-evenly'
        alignItems='center'
        mt={2}
      >
        <Paper sx={{ marginX: '5px' }} elevation={2}>
          <Box mx={5} my={2} display={'flex'} alignItems='center'>
            <FunctionsIcon
              sx={{
                backgroundColor: 'yellow',
                borderRadius: '50px',
                fontSize: '30pt',
                color: 'white',
                mr: '15px',
              }}
            />
            <Box>
              <Typography variant='h4' fontWeight={'bold'}>
                {couriers.length}
              </Typography>
              <Typography variant='caption' color={'grey'}>
                Total Couriers
              </Typography>
            </Box>
            <BarChartIcon
              sx={{
                fontSize: '25pt',
                color: 'grey',
                ml: '45px',
              }}
            />
          </Box>
        </Paper>
        <Paper sx={{ marginX: '5px' }} elevation={2}>
          <Box mx={5} my={2} display={'flex'} alignItems='center'>
            <DoneIcon
              sx={{
                backgroundColor: 'greenyellow',
                borderRadius: '50px',
                fontSize: '30pt',
                color: 'white',
                mr: '15px',
              }}
            />
            <Box>
              <Typography variant='h4' fontWeight={'bold'}>
                {acceptedCouriers.length}
              </Typography>
              <Typography variant='caption' color={'grey'}>
                Accepted Couriers
              </Typography>
            </Box>
            <BarChartIcon
              sx={{
                fontSize: '25pt',
                color: 'grey',
                ml: '45px',
              }}
            />
          </Box>
        </Paper>
        <Paper sx={{ marginX: '5px' }} elevation={2}>
          <Box mx={5} my={2} display={'flex'} alignItems='center'>
            <DeliveryDiningIcon
              sx={{
                backgroundColor: 'blueviolet',
                borderRadius: '50px',
                fontSize: '30pt',
                color: 'white',
                mr: '15px',
              }}
            />
            <Box>
              <Typography variant='h4' fontWeight={'bold'}>
                {dispatchedCouriers.length}
              </Typography>
              <Typography variant='caption' color={'grey'}>
                Dispatched Couriers
              </Typography>
            </Box>
            <BarChartIcon
              sx={{
                fontSize: '25pt',
                color: 'grey',
                ml: '45px',
              }}
            />
          </Box>
        </Paper>
        <Paper sx={{ marginX: '5px' }} elevation={2}>
          <Box mx={5} my={2} display={'flex'} alignItems='center'>
            <ErrorOutlineOutlinedIcon
              sx={{
                backgroundColor: 'red',
                borderRadius: '50px',
                fontSize: '30pt',
                color: 'white',
                mr: '15px',
              }}
            />
            <Box>
              <Typography variant='h4' fontWeight={'bold'}>
                {unsuccessfulCouriers.length}
              </Typography>
              <Typography variant='caption' color={'grey'}>
                Unsuccessful Couriers
              </Typography>
            </Box>
            <BarChartIcon
              sx={{
                fontSize: '25pt',
                color: 'grey',
                ml: '45px',
              }}
            />
          </Box>
        </Paper>
      </Box>
      <Box height={250} mt={2}>
        <Box display={'flex'} width={400} justifyContent={'space-between'}>
          <Chip
            sx={{ backgroundColor: '#E38627', color: 'white' }}
            label='Accepted'
          />
          <Chip
            sx={{ backgroundColor: '#C13C37', color: 'white' }}
            label='Dispatched'
          />
          <Chip
            sx={{ backgroundColor: '#6A2135', color: 'white' }}
            label='Unsuccessful'
          />
        </Box>
        <PieChart
          totalValue={100}
          data={[
            {
              title: 'Accepted',
              value: ((acceptedCouriers.length / couriers.length) * 100).toFixed(1),
              color: '#E38627',
            },
            {
              title: 'Dispatched',
              value: ((dispatchedCouriers.length / couriers.length) * 100).toFixed(1),
              color: '#C13C37',
            },
            {
              title: 'Unsuccessful',
              value: ((unsuccessfulCouriers.length / couriers.length) * 100).toFixed(1),
              color: '#6A2135',
            },
          ]}
          label={({ dataEntry }) => dataEntry.value + '%'}
          labelStyle={{
            fontSize: '7px',
            fill: 'white',
            fillOpacity: '0.75',
          }}
          animate={true}
          animationDuration='500'
          animationEasing='ease-out'
        />
      </Box>
    </Box>
  )
}

export default Dashboard
