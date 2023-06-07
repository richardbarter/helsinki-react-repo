import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (content) => {
  const anecdoteObject = { content: content, votes: 0 }
  const response = await axios.post(baseUrl, anecdoteObject)
  console.log('creat eanecdote repsonse', response);
  return response.data
}

const voteAnecdote = async (anecdote) => {
  //console.log('in service vote. content is', anecdote);
  //const anecdoteToChange = state.find(anecdote => anecdote.id === id)
  const id = anecdote.id
  const changedAnecdote = {
    ...anecdote,
    votes: anecdote.votes + 1
  }
  const response = await axios.put(`${baseUrl}/${id}`, changedAnecdote)
  console.log('response after put', response);
  return response.data
  // const newState = state.map(a => a.id !== changedAnecdote.id ? a : changedAnecdote)
  // newState.sort((a, b) => b.votes - a.votes)
}

const exportedObject = {
  getAll,
  createAnecdote,
  voteAnecdote
}

export default exportedObject