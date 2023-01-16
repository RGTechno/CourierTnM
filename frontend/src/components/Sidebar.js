import { useState } from 'react'
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarContent,
  SidebarFooter,
} from 'react-pro-sidebar'
import { Box, IconButton, Typography } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'
import 'react-pro-sidebar/dist/css/styles.css'
import HomeIcon from '@mui/icons-material/Home'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined'
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import ShareLocationOutlinedIcon from '@mui/icons-material/ShareLocationOutlined'
import { useDispatch } from 'react-redux'
import { logout } from '../state/actions/authActions'
import colors from '../colors'
import '../styles/Sidebar.css'
import { useSelector } from 'react-redux'

const Item = ({ title, to, icon, selected, setSelected, collapsed }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: collapsed
          ? selected === title
            ? colors.iconColor
            : 'black'
          : 'black',
        backgroundColor: collapsed
          ? undefined
          : selected === title
          ? colors.active
          : 'transparent',
        fontWeight: 'bold',
        borderRadius: '5px',
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title.toUpperCase()}</Typography>
      <Link to={to} />
    </MenuItem>
  )
}

const Sidebar = () => {
  const department = useSelector((state) => state.auth.department)
  const currentLoc = useLocation().pathname.split('/')[1]

  const [collapsed, setCollapsed] = useState(false)
  const [selected, setSelected] = useState(
    currentLoc === 'auth' ? 'dashboard' : currentLoc
  )

  const dispatch = useDispatch()

  return (
    <Box
      id='sidebar'
      sx={{
        '& .pro-sidebar-inner': {
          background: `${colors.primary} !important`,
        },
        '& .pro-icon-wrapper': {
          backgroundColor: 'transparent !important',
        },
        '& .pro-inner-item': {
          padding: '5px 35px 5px 20px !important',
        },
      }}
    >
      <ProSidebar collapsed={collapsed}>
        <SidebarContent>
          <Menu iconShape='square'>
            <MenuItem
              onClick={() => setCollapsed(!collapsed)}
              icon={collapsed ? <MenuOutlinedIcon /> : undefined}
              style={{
                margin: '10px 0 20px 0',
                color: 'black',
              }}
            >
              {!collapsed && (
                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                  ml='15px'
                >
                  <Typography
                    variant='h5'
                    style={{ color: 'black', fontWeight: 'bold' }}
                  >
                    CourierTnM
                  </Typography>
                  <IconButton
                    onClick={() => setCollapsed(!collapsed)}
                    style={{ color: 'black' }}
                  >
                    <MenuOutlinedIcon />
                  </IconButton>
                </Box>
              )}
            </MenuItem>

            {!collapsed && (
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
                    fontWeight='bold'
                    sx={{ m: '10px 0 0 0', color: 'black' }}
                  >
                    {department.name}
                  </Typography>
                  <Typography>
                    Registration Number #{department.registrationNumber}
                  </Typography>
                </Box>
              </Box>
            )}

            <Box
              paddingLeft={collapsed ? undefined : '10%'}
              marginRight={2}
              marginTop={1}
            >
              <Item
                title='dashboard'
                to='/dashboard'
                icon={<HomeIcon />}
                selected={selected}
                setSelected={setSelected}
                collapsed={collapsed}
              />
            </Box>

            <Box
              paddingLeft={collapsed ? undefined : '10%'}
              marginRight={2}
              marginTop={1}
            >
              <Item
                title='profile'
                to='/profile'
                icon={<ManageAccountsIcon />}
                selected={selected}
                setSelected={setSelected}
                collapsed={collapsed}
              />
            </Box>

            <Box
              paddingLeft={collapsed ? undefined : '10%'}
              marginRight={2}
              marginTop={1}
            >
              <Item
                title='couriers'
                to='/couriers'
                icon={<LocalShippingOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                collapsed={collapsed}
              />
            </Box>
            <Box
              paddingLeft={collapsed ? undefined : '10%'}
              marginRight={2}
              marginTop={1}
            >
              <Item
                title='track'
                to='/track/courier'
                icon={<ShareLocationOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
                collapsed={collapsed}
              />
            </Box>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <Menu iconShape='square'>
            <MenuItem
              active={selected === 'Logout'}
              onClick={() => dispatch(logout())}
              icon={
                <LogoutOutlinedIcon
                  sx={{
                    color: 'black',
                  }}
                />
              }
            >
              <Typography color={'black'}>{'Logout'}</Typography>
            </MenuItem>
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </Box>
  )
}

export default Sidebar
