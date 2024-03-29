import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/notes'
// const baseUrl = 'https://cold-sound-7520.fly.dev/api/notes'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  }
  return request.then(response => response.data.concat(nonExisting))
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

// const create = newObject => {
//   const request = axios.post(baseUrl, newObject)
//   return request.then(response => response.data)
// }

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }

// the labels to the left are the keys of the object; the ones on the right are variables that are defined inside the module.
//since they have the same name. we can write the object def with more compact syntax.
// export default {
//     getAll: getAll,
//     create: create,
//     update: update
// }