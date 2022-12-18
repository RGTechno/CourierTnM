import Auth from './components/Auth/Auth'
import { useSelector } from 'react-redux'
import Dashboard from './components/Dashboard'

function App() {
  const auth = useSelector((state) => state.auth)
  return <div>{auth.department === null ? <Auth /> : <Dashboard />}</div>
}

export default App
