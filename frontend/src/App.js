import './App.css'
import { login } from './state/actions/authActions'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  return (
    <div className='App'>
      <button onClick={() => dispatch(login())}>LOGIN</button>
    </div>
  )
}

export default App
