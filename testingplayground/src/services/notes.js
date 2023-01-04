import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update }

// the labels to the left are the keys of the object; the ones on the right are variables that are defined inside the module.
//since they have the same name. we can write the object def with more compact syntax.
// export default {
//     getAll: getAll,
//     create: create,
//     update: update
// }