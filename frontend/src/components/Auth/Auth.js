import React, { useState } from 'react'
import Login from './Login'
import SignUp from './SignUp'
import './styles/auth.css'

const Auth = () => {
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
    </div>
  )
}

export default Auth
