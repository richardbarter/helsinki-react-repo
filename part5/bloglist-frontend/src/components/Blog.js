import Togglable from './Togglable'

const Blog = ({ blog, handleAddLike, user, handleDeleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  //console.log('blog is', blog);

  return (

    <div style={blogStyle} className="blog">
      <div className="blog-title-user">
        {blog.title} {blog.author}
      </div>
      <Togglable buttonLabel='view' hideLabel="hide">

        <div className="blog-additional-info">
          <div className="blog-url">
            {blog.url}
          </div>
          <div className="blog-likes">
            likes {blog.likes}
            <button onClick={handleAddLike} className="blog-like-btn">like</button>
          </div>
        </div>
        {blog.user &&
          <div>
            {blog.user.name}
            {blog.user.id === user.id &&
            <div>
              <button className="delete-blog-btn" onClick={handleDeleteBlog}>remove</button>
            </div>
            }
          </div>
        }

      </Togglable>
    </div>
  )
}

export default Blog