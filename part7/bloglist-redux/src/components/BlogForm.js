import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const addNewBlog = (event) => {
    event.preventDefault()
    //blogFormRef.current then gives access to the defined function from the component? in this case that is toggleVisibility
    const content = {
      title: title,
      author: author,
      url: url,
    }
    console.log('add new blog, dispatch createblog')
    dispatch(createBlog(content))
    dispatch(
      setNotification(
        `a new blog ${content.title} by ${content.author} added`,
        5,
        'success'
      )
    )

    setTitle('')
    setAuthor('')
    setUrl('')

    blogFormRef.current.toggleVisibility()
  }

  return (
    <Togglable buttonLabel="new blog" hideLabel="cancel" ref={blogFormRef}>
      <div>
        <h2>Create new blog</h2>
        <form onSubmit={addNewBlog}>
          <div>
            title:
            <input
              type="text"
              value={title}
              name="Title"
              onChange={({ target }) => setTitle(target.value)}
              id="blog-title-input"
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={author}
              name="Author"
              onChange={({ target }) => setAuthor(target.value)}
              id="blog-author-input"
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              name="Url"
              onChange={({ target }) => setUrl(target.value)}
              id="blog-url-input"
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    </Togglable>
  )
}

export default BlogForm
