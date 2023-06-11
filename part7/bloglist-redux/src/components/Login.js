import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import Togglable from './Togglable'
import LoginForm from './LoginForm'
import { setUser, removeUser } from '../reducers/userReducer'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from '../reducers/notificationReducer'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(({ user }) => {
    return user
  })
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loginUser = await loginService.login({
        username,
        password,
      })
      console.log('attempt login', user)
      dispatch(setUser(loginUser))
      window.localStorage.setItem(
        'loggedBlogappUser',
        JSON.stringify(loginUser)
      )
      blogService.setToken(loginUser.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      //have a reducer for error style?
      dispatch(setNotification(`Wrong credentials`, 5, 'error'))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      //setUser(null)
      dispatch(removeUser())
      window.localStorage.removeItem('loggedBlogappUser')
    } catch (exception) {
      console.log('exception', exception)
    }
  }

  return (
    <div>
      {!user && (
        <Togglable buttonLabel="login" hideLabel="cancel">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      )}
    </div>
  )
}

export default Login
