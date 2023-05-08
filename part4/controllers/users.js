
const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
    .populate('blogs', { url: 1, title: 1, author: 1, id: 1 })

  response.json(users)
})
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const saltRounds = 10

  //check that password is longer than 3 characters and exists
  if(!password){
    return response.status(400).json({
      error: 'Password is missing.'
    })
  }
  if(password.length < 4){
    return response.status(400).json({
      error: 'Password is shorter than the minimum allowed length (3).'
    })
  }
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

usersRouter.delete('/:id', async (request, response) => {
  await User.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = usersRouter



