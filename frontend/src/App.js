import Auth from './components/Auth/Auth'
import { useSelector } from 'react-redux'
import Dashboard from './components/Dashboard'
import { BrowserRouter } from 'react-router-dom'

function App() {
  const auth = useSelector((state) => state.auth)

  return (
    <BrowserRouter>
      {auth.accessToken === null ? <Auth /> : <Dashboard />}
    </BrowserRouter>
  )
}

export default App
