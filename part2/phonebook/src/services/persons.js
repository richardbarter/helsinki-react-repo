import axios from 'axios'
//const baseUrl = 'http://localhost:3001/api/persons'
//const baseUrl = 'https://redcoat-phonebook-1212.fly.dev/api/persons'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = personObject => {
  const request = axios.post(baseUrl, personObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const removePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

export default {getAll, create, update, removePerson}