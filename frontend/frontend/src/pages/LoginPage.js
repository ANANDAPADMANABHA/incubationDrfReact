import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {
  let {loginUser}= useContext(AuthContext)
  console.log('login page')
  return (
    <div>
      <form onSubmit={loginUser} >
        <input type="text" name='email' placeholder='Enter email' />
        <input type="password" name='password' placeholder='Enter Password' />
        <input type="submit" />

      </form>
    </div>
  )
}

export default LoginPage
