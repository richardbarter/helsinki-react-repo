const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Hello Blog",
    author: "Camina Drummer",
    url: "www.google.com",
    likes: 60
  },
  {
    title: "A time in space",
    author: "James Holden",
    url: "google.co.uk",
    likes: 85
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}