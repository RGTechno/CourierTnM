import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCouriers } from '../../state/actions/courierActions'
import NewCourierModal from '../NewCourierModal'
import Moment from 'react-moment'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { visuallyHidden } from '@mui/utils'
import { ToastContainer, toast } from 'react-toastify'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import 'react-toastify/dist/ReactToastify.css'
import colors from '../../colors'
import {
  Button,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  InputAdornment,
} from '@mui/material'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

const headCells = [
  {
    id: 'referenceId',
    label: 'Reference ID',
  },
  {
    id: 'item',
    label: 'Package Description',
  },
  {
    id: 'weight',
    label: 'Weight',
  },
  {
    id: 'sender',
    label: 'Sender',
  },
  {
    id: 'receiver',
    label: 'Receiver',
  },
  ,
  {
    id: 'status',
    label: 'Status',
  },
  ,
  {
    id: 'updatedDate',
    label: 'Updated Date',
  },
]

function ColumnHeads(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead sx={{ backgroundColor: colors.primary }}>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='center'
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{ fontWeight: 'bold' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

const getRowsList = (couriersList) => {
  const rowsList = []
  couriersList.map((courier) => {
    const singleRow = {
      id: courier._id,
      item: courier.packageName,
      weight: courier.packageWeight,
      sender: courier.senderDetails.name,
      senderEmail: courier.senderDetails.email,
      receiver: courier.receiverDetails.name,
      receiverEmail: courier.receiverDetails.email,
      status: courier.departmentStatus,
      updatedDate: courier.updatedAt,
    }
    rowsList.push(singleRow)
  })
  return rowsList
}

const Couriers = () => {
  const state = useSelector((state) => state)
  const dispatch = useDispatch()

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('updatedDate')
  const [selected, setSelected] = useState([])
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const [modalOpen, setModalOpen] = React.useState(false)
  const handleModalOpen = () => setModalOpen(true)
  const handleModalClose = () => {
    setModalOpen(false)
    // window.location.reload()
  }

  useEffect(() => {
    dispatch(getAllCouriers(state.auth.accessToken))
  }, [modalOpen])

  const courierRowsList = getRowsList(state.courier.couriers)
  const [rows, setRows] = useState(courierRowsList)

  const refIdSearch = (event) => {
    const searchedId = event.target.value
    if (searchedId.length === 0) {
      setRows(courierRowsList)
      return
    }
    const newRows = courierRowsList.filter((courier) => {
      return courier.id === searchedId
    })
    setRows(newRows)
  }

  const emailIdSearch = (event) => {
    const searchedEmail = event.target.value
    if (searchedEmail.length === 0) {
      setRows(courierRowsList)
      return
    }
    const newRows = courierRowsList.filter((courier) => {
      return (
        courier.senderEmail === searchedEmail ||
        courier.receiverEmail === searchedEmail
      )
    })
    setRows(newRows)
  }
  const dateSearch = (event) => {
    const eventId = event.target.id
    var startDate, endDate
    if (eventId === 'startDate') {
      startDate = event.target.value
    } else {
      endDate = event.target.value
    }

    if (startDate && endDate) {
      const newRows = courierRowsList.filter((courier) => {
        const sDate = new Date(startDate)
        const eDate = new Date(endDate)
        const uDate = new Date(courier.updatedDate)

        return uDate >= sDate && uDate <= eDate
      })

      setRows(newRows)
    } else if (startDate && !endDate) {
      const newRows = courierRowsList.filter((courier) => {
        const sDate = new Date(startDate)
        const uDate = new Date(courier.updatedDate)

        return uDate >= sDate
      })

      setRows(newRows)
    } else if (endDate && !startDate) {
      const newRows = courierRowsList.filter((courier) => {
        const eDate = new Date(endDate)
        const uDate = new Date(courier.updatedDate)

        return uDate <= eDate
      })

      setRows(newRows)
    } else {
      setRows(courierRowsList)
    }
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  return (
    <Box mx='20px' my='10px'>
      {/* Nav Bar for functionalities */}
      <Box mb='10px' sx={{ display: 'flex', alignItems: 'center' }}>
        <Box
          sx={{ display: 'flex', justifyContent: 'space-evenly', flexGrow: 1 }}
        >
          <Box>
            <TextField
              label='Reference ID'
              variant='standard'
              onChange={refIdSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box>
            <TextField
              label='Email'
              variant='standard'
              onChange={emailIdSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box>
            <TextField
              id='startDate'
              label='Start Date'
              type='date'
              variant='standard'
              onChange={dateSearch}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
          <Box>
            <TextField
              id='endDate'
              label='End Date'
              type='date'
              variant='standard'
              onChange={dateSearch}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Box>
        <Box>
          <Button
            variant='contained'
            endIcon={<AddOutlinedIcon />}
            sx={{
              color: 'white',
              backgroundColor: 'black',
              borderRadius: '20px',
            }}
            onClick={handleModalOpen}
          >
            Add New
          </Button>
          <NewCourierModal
            modalOpen={modalOpen}
            handleModalClose={handleModalClose}
          />
        </Box>
      </Box>
      {/* Table Data for couriers */}
      <Paper sx={{ mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <ColumnHeads
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover key={row.id}>
                      <TableCell align='center'>{row.id}</TableCell>
                      <TableCell align='center'>{row.item}</TableCell>
                      <TableCell align='center'>{row.weight}</TableCell>
                      <TableCell align='center'>{row.sender}</TableCell>
                      <TableCell align='center'>{row.receiver}</TableCell>
                      <TableCell align='center'>{row.status}</TableCell>
                      <TableCell align='center'>
                        <Moment format='DD/MM/YYYY hh:mm a'>
                          {row.updatedDate}
                        </Moment>
                      </TableCell>
                    </TableRow>
                  )
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
      <ToastContainer />
    </Box>
  )
}

export default Couriers
