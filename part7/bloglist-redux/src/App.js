import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import LogoutForm from './components/LogoutForm'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { removeUser, setUser } from './reducers/userReducer'

const App = () => {
  //const [blogs, setBlogs] = useState([])
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  //const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  const user = useSelector(({ user }) => {
    return user
  })

  //get all blogs
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  //check if user is logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      //should dispatch setUser also do the setToken?
      dispatch(setUser(user))

      blogService.setToken(user.token)
    }
  }, [])

  //only show blogs if logged in.
  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      <Login />
      {/* have Logout component and then blog form and bloglist? Should blog form and blog list be inside one blogs component? */}
      {user && (
        <div>
          <p>{user.name} logged in</p>
          <LogoutForm />
          <BlogForm />
          <h2>blogs</h2>
          <BlogList></BlogList>
        </div>
      )}
    </div>
  )
}

export default App
