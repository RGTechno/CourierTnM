import Auth from './components/Auth/Auth'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Main from './components/Main'

function App() {
  const state = useSelector((state) => state)

  return <>{state.auth.accessToken == null ? <Auth /> : <Main />}</>
}

export default App
