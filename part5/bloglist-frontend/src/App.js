import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [errorMessage, setErrorMessage] = useState(null)
  const [errorStyle, setErrorStyle] = useState('')
  const blogFormRef = useRef()

  //get all blogs
  useEffect(() => {
    console.log('in use effect getAll')
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  //check if user is logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      console.log('attempt login', user)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch (exception) {
      setErrorStyle('error')
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    try {
      setUser(null)
      window.localStorage.removeItem('loggedBlogappUser')
    }catch (exception){
      console.log('exception', exception)
    }

  }

  const addNewBlog = (blogObject) => {
    //.current then gives access to the defined function from the component? in this case that is toggleVisibility
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        console.log('returned blog is', returnedBlog)
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
        setErrorStyle('success')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

      })

  }

  const handleAddLike = (id) => {
    console.log('add like, id is ', id)

    const blog = blogs.find(blog => blog.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }
    console.log('changedBlog is ', changedBlog)
    //change to async/await
    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        console.log('updated blog is ' , returnedBlog)
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
  }

  const handleDeleteBlog = async (id) => {
    console.log('in handle delete blog')
    const blogObject = blogs.find(blog => blog.id === id)
    //current error soemthing to do with user. delete request user is undefined. controllers/blogs.js 74
    if(window.confirm(`remove blog ${blogObject.title} by ${blogObject.author}`)){
      try {
        await blogService.deleteBlog(id)
        setErrorStyle('success')
        setErrorMessage(`Deleted blog ${blogObject.title}`)
        //remove the deleted item from blogs
        setBlogs(blogs.filter(b => b.id !== id))
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)


      }catch (error){
        console.log('error deleting blog', error)
      }

    }

  }


  //refactor to component
  const logoutForm = () => (
    <form onSubmit={handleLogout}>
      <button type="submit">Logout</button>
    </form>
  )

  //only show blogs if logged in.
  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage} style={errorStyle} />
      {!user &&
        <Togglable buttonLabel='login' hideLabel="cancel">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      }
      {user && <div>
        <p>{user.name} logged in</p>
        {logoutForm()}
        <Togglable buttonLabel='new blog' hideLabel="cancel" ref={blogFormRef}>
          <BlogForm
            createBlog={addNewBlog}
          />
        </Togglable>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            handleAddLike={() => handleAddLike(blog.id)}
            user={user}
            handleDeleteBlog={() => handleDeleteBlog(blog.id)}
          />
        )}
        {/* <BlogsList blogs={blogs} /> */}
      </div>
      }
    </div>
  )
}

export default App