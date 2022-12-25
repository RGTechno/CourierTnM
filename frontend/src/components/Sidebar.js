import { useState } from 'react'
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarContent,
  SidebarFooter,
} from 'react-pro-sidebar'
import { Box, IconButton, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import 'react-pro-sidebar/dist/css/styles.css'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { useDispatch } from 'react-redux'
import { logout } from '../state/actions/authActions'
import colors from '../colors'
import '../styles/Sidebar.css'
import { useSelector } from 'react-redux'

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  )
}

const Sidebar = () => {
  const department = useSelector((state) => state.auth.department)

  const [isCollapsed, setIsCollapsed] = useState(false)
  const [selected, setSelected] = useState('Dashboard')

  const dispatch = useDispatch()

  return (
    <Box
      id='sidebar'
      sx={{
        '& .pro-sidebar-inner': {
          background: `${colors.primary[400]} !important`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
        },
        '& .pro-inner-item:hover': {
          color: '#868dfb !important',
        },
        '& .pro-menu-item.active': {
          color: '#6870fa !important',
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <SidebarContent>
          <Menu iconShape='square'>
            {/* LOGO AND MENU ICON */}
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: '10px 0 20px 0',
                color: colors.grey[100],
              }}
            >
              {!isCollapsed && (
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                  ml='15px'
                >
                  <Typography variant='h5' color={colors.grey[100]}>
                    CourierTnM
                  </Typography>
                  <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!isCollapsed && (
              <Box mb='25px'>
                <Box display='flex' justifyContent='center' alignItems='center'>
                  <img
                    alt='profile-user'
                    width='100px'
                    height='100px'
                    src={`https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?b=1&s=612x612&w=0&k=20&c=2IYaKietQSwuKorT6F4aCPhSm8pJp8gT9hElgF9KxzQ=`}
                    style={{ cursor: 'pointer', borderRadius: '50%' }}
                  />
                </Box>
                <Box textAlign='center'>
                  <Typography
                    variant='h5'
                    color={colors.grey[100]}
                    fontWeight='bold'
                    sx={{ m: '10px 0 0 0' }}
                  >
                    {department.name}
                  </Typography>
                  <Typography color={colors.grey[100]}>
                    Registration Number #{department.registrationNumber}
                  </Typography>
                </Box>
              </Box>
            )}

            <Box paddingLeft={isCollapsed ? undefined : '10%'}>
              <Item
                title='Dashboard'
                to='/'
                icon={<HomeOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </Box>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu iconShape='square'>
            <MenuItem
              active={selected === 'Logout'}
              style={{
                color: colors.grey[100],
              }}
              onClick={() => dispatch(logout())}
              icon={<LogoutOutlinedIcon />}
            >
              <Typography>{'Logout'}</Typography>
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </Box>
  )
}

export default Sidebar
