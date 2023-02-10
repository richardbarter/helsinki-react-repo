const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))

  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

})

test('all blogs are returned', async () => {
  // await api
  //   .get('/api/blogs')
  //   .expect(200)
  //   .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  //console.log('response is', response.body);
  expect(response.body).toHaveLength(helper.initialBlogs.length)

})

test('blogs unique idnetifier is named id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
  //expect(response.body[0].id).toBeDefined()
  //const contents = await api
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'A new blog',
    author: 'Johnny Smith',
    url: 'www.google.comm',
    likes: 50
  } 
  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  console.log('blogs at end', blogsAtEnd);
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})
afterAll(async () => {
  await mongoose.connection.close()
})