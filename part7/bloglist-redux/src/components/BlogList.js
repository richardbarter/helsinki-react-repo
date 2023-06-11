import { useDispatch, useSelector } from 'react-redux'
import { addLike, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Blog from './Blog'

const BlogList = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ user }) => {
    return user
  })
  const blogs = useSelector(({ blogs }) => {
    return blogs
  })
  console.log('blog list, blogs are', blogs)

  const handleAddLike = (blog) => {
    dispatch(addLike(blog))
    //const changedBlog = { ...blog, likes: blog.likes + 1 }
    //console.log('changedBlog is ', changedBlog)
    //change to async/await
    // blogService.update(id, changedBlog).then((returnedBlog) => {
    //   console.log('updated blog is ', returnedBlog)
    //   setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
    // })
  }

  const handleDeleteBlog = async (id) => {
    console.log('in handle delete blog. id is', id)
    const blogObject = blogs.find((blog) => blog.id === id)
    //current error soemthing to do with user. delete request user is undefined. controllers/blogs.js 74
    if (
      window.confirm(`remove blog ${blogObject.title} by ${blogObject.author}`)
    ) {
      try {
        //await blogService.deleteBlog(id)
        //remove the deleted item from blogs
        //setBlogs(blogs.filter((b) => b.id !== id))
        dispatch(deleteBlog(id))
        dispatch(
          setNotification(`Deleted blog ${blogObject.title}`, 3, 'success')
        )
      } catch (error) {
        console.log('error deleting blog', error)
      }
    }
  }

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleAddLike={() => handleAddLike(blog)}
          user={user}
          handleDeleteBlog={() => handleDeleteBlog(blog.id)}
        />
      ))}
    </div>
  )
}

export default BlogList
