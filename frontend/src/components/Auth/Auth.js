import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Login from './Login'
import SignUp from './SignUp'
import './styles/auth.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Auth = () => {
  const auth = useSelector((state) => state.auth)
  const [isLogin, setIsLogin] = useState(true)
  function changeAuthType(current) {
    setIsLogin(!current)
  }
  return (
    <div className='authRoot'>
      {/* Login or Signup */}
      {isLogin ? (
        <Login handleAuthToggle={changeAuthType} />
      ) : (
        <SignUp handleAuthToggle={changeAuthType} />
      )}
      {auth.accessToken === null && auth.error != null && (
        <ToastContainer autoClose={5000} />
      )}
    </div>
  )
}

export default Auth
