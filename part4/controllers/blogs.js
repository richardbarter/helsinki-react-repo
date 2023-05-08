const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
//const jwt = require('jsonwebtoken')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '')
//   }

//   return null
// }

blogsRouter.get('/', async (request, response) => {
  let blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1, id: 1 })


  console.log('blogs is', blogs)
  blogs = blogs.sort((a, b) => {
    return a.likes < b.likes ? 1 : -1
  })
  console.log('after sort', blogs)
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  console.log('in post new blog')
  console.log('request body is', request.body)
  console.log('request user is', request.user)
  const body = request.body

  const user = await User.findById(request.user)
  console.log('user found is', user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })
  //await blog.validate()
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  //add user information to savedBlog before returning? right now it is returning
  savedBlog.user = user
  //^ this is giving back too much info. only need the user id, name and username. figure out how to fix this.
  response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async (request, response) => {
  console.log('in delete')
  //userid of logged in user
  const user = request.user
  console.log('delete request user is ', request.user)

  //get user who created blog
  const blog = await Blog.findById(request.params.id)
  const blog_creator = blog.user
  if(!blog_creator){
    return response.status(400).json({
      error: 'Blog has no author'
    })
  }

  //check if user deleting blog is same as user who created it
  if(blog_creator.toString() === user.toString()){
    console.log('before actual removal')
    //remove blog
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }else{
    return response.status(401).json({
      error: 'Can only delete blogs you created.'
    })
  }

  //const blog = await Blog.findByIdAndRemove(request.params.id)
  //if(blog.user.toString() === userid.toString())

})

blogsRouter.put('/:id', async (request, response) => {
  console.log('body is', request.body)
  //console.log('request .user is ', request.user);
  //need to keep the original user
  console.log('after body')
  const body = request.body
  console.log('user is ', body.user)
  const user = await User.findById(request.user)
  console.log('test')

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  }
  //new: true will mean the returned blog will be the new modified document rather than the original .
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })

  updatedBlog.user = user
  //still need to get the updated blog to return the full user information not just the ID.
  response.json(updatedBlog)
})




module.exports = blogsRouter