import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCouriers } from '../../state/actions/courierActions'
import NewCourierModal from '../NewCourierModal'
import Moment from 'react-moment'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import { visuallyHidden } from '@mui/utils'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align='center'
            sortDirection={orderBy === headCell.id ? order : false}
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
      receiver: courier.receiverDetails.name,
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

  const rows = getRowsList(state.courier.couriers)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  return (
    <Box m='20px'>
      {/* Nav Bar for functionalities */}
      <Box mb='7px' sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }}></Box>
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
