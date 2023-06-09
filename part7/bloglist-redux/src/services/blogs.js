import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  console.log('on create the response.data is ', response.data)
  return response.data
}

const update = async (id, blogObject) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, blogObject, config)
  console.log('on update return is ', response.data)
  return response.data
}
const deleteBlog = async (id) => {
  //console.log('blog object to delete is ', blogObject);
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  console.log('delete response is ', response)
  console.log('status is ', response.status)
  //check that blog no longer exists to ensure it deleted sucessfully? Or just return successs?
  return response.status
}

export default { getAll, create, update, deleteBlog, setToken }
