const Blog = require('../models/blog')
const User = require('../models/user')

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

// const initialUsers = [
//   {
//     username: 'Drummer1',
//     name: "Camina Drummer",
//     passwordHash: "beltalowda"
//   },
//   {
//     username: "Jimmy",
//     name: "James Holden",
//     password: "eartha"
//   }
// ]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async() => {
  const users = await User.find({})
 
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb, usersInDb
}