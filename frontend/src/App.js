import Auth from './components/Auth/Auth'
import { useSelector } from 'react-redux'

import Main from './components/Main'

function App() {
  const state = useSelector((state) => state)

  return <>{state.auth.accessToken == null ? <Auth /> : <Main />}</>
}

export default App
