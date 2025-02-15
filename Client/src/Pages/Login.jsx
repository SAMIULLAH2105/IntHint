import { Button } from '@/Components/ui/button'
import React from 'react'
import { StoreProvider } from '@/Store/Store'
import { useContext } from 'react'

const Login = () => {

  const {dispatch, state} = useContext(StoreProvider)
  const {user, isAuth} = state

  

  const handleLogin = () => {
    
    dispatch({type: 'LOGIN', payload: true})
    dispatch({type: 'ADDUSER', payload: id})

  }

  return (
    <div>
      <Button>Login</Button>
    </div>
  )
}

export default Login
