const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

describe('When there is initiall some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
    //login and get token?
    //const token = ...;
  
  })
  describe('where there is initially some blogs saved', () => {
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
  
  })
  
  describe('addition of a new blog', () => {
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
        .setHeader('Authorization', token)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const blogsAtEnd = await helper.blogsInDb()
      console.log('blogs at end', blogsAtEnd);
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    })
    
    test('if likes property is missing it defaults to 0', async () => {
      const newBlog = {
        title: 'a Test blog',
        author: 'Michael Scott',
        url: 'www.google.com'
      }
    
      const resultBlog = await api
        .post('/api/blogs')
        .send(newBlog)
    
      console.log('result blog is', resultBlog.body);
      expect(resultBlog.body.likes).toBe(0)
    })
    
    test('blog without title is not added', async () => {
      const newBlog = {
        author: 'Michael Scott',
        url: 'www.google.com'
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    
      const blogsAtEnd = await helper.blogsInDb()
    
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
      
    })
    
    test('blog without author is not added', async () => {
      const newBlog = {
        title: 'book title ex',
        url: 'www.google.com'
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    
      const blogsAtEnd = await helper.blogsInDb()
    
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
      
    })
  
  })
  
  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
  
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
  
      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
      const blogIds = blogsAtEnd.map(b => b.id)
      expect(blogIds).not.toContain(blogToDelete.id)
    })
  
    // test('fails with status code 400 if data invalid', async () => {
  
    // })
  })
  
  describe('updating of a blog', () => {
    test('succeeds if data valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const blogToAmend =  {
        title: "Hello Blog Two",
        author: "Camina Drummer",
        url: "www.google.com",
        likes: 80,
      }
  
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToAmend)
        .expect(200)
  
     
      const blogsAtEnd = await helper.blogsInDb()
       //check length is same
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
      //check the blog contains new likes?
      expect(blogsAtEnd[0].likes).toBe(80)
  
      
  
    })
    test('fails with status code 400 if data invalid', async () => {
      
    })
  })

})


describe('where there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'testName', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)

  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
 
    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)

  })

  test('creation fails with proper statuscode when username is less than 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ca',
      name: 'test fail',
      password: 'testpassword'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    console.log('result body error is', result.body.error);
    expect(result.body.error).toContain('User validation failed: username: Path `username` (`ca`) is shorter than the minimum allowed length (3)')
    const usersAtEnd = await helper.usersInDb()

    expect(usersAtEnd).toEqual(usersAtStart)
  })



})


afterAll(async () => {
  await mongoose.connection.close()
})