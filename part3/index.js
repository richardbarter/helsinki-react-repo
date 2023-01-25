
require('dotenv').config()
console.log('in start')
const express = require('express')
//const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')
//const { findByIdAndRemove } = require('./models/person');





// morgan.token('body', function (req, res) {
//   return JSON.stringify(req.body)
// })
// app.use(assignId)
// app.use(morgan(':id :method :url :response-time'))
//app.use(morgan('tiny'))
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(express.static('build'))
app.use(express.json())
app.use(requestLogger)
app.use(cors())



app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })

})

app.get('/api/info', (request, response) => {
  console.log('in info')
  Person.find({}).then(persons => {
    const phonebookLength = persons.length
    const date = new Date()
    const info = `<div>Phonebook has info for ${phonebookLength} people</div><div> ${date}</div>`
    console.log('response is', info)
    response.send(info)

  })
})


app.get('/api/persons/:id', (request, response, next) => {
  //console.log('get by id');
  Person.findById(request.params.id)
    .then(person => {
      if(person){
        response.json(person)
      }else{
        response.status(404).end()
      }
    })
    .catch(error => next(error))

  //convert into number so it can't be  astring by mistake
  //paramaters are defined by :id -- hence we can access the id parameter via request.params.id

})



app.post('/api/persons', (request, response, next) => {
  console.log('test post')
  console.log('post request body is', request.body)

  const body = request.body
  const personName = body.name
  const personNumber = body.number


  //check if contents missing

  if(!personName){
    return response.status(400).json({
      error: 'Name missing'
    })
  }
  if(!personNumber){
    return response.status(400).json({
      error: 'Number missing'
    })
  }

  Person.find({ name: personName })
    .then(person => {
      console.log('on create, name exists result', person)
      console.log('person length is ', person.length)
      //if name already exists respond with relevant status code and error message.
      if(person.length > 0){
        console.log('person exists return error')
        response.status(400).send({ error: 'Name already exists in phonebook' })
      }else{
        const person = new Person({
          name: personName,
          number: personNumber,
        })
        person.save()
          .then(savedPerson => {
            response.json(savedPerson)
          })
          .catch(error => next(error))

      }
    })
    .catch(error => next(error))
  console.log('after . find')



})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  console.log('put body is', body)
  const { name, number } = request.body
  // const person = {
  //   name: body.name,
  //   number: body.number
  // }
  Person.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  console.log('in delete person')

  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))

})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.log('error message')
  if(error.name === 'CastError'){
    return response.status(400).send({ error: 'malformatted id' })
  }else if(error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

//use port defined in environment variable PORT, or port 3001 if environment variable PORT is undefined
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


// const PORT = 3001
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
// })

