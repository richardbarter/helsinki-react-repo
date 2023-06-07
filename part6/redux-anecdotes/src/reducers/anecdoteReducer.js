import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from '../services/anecdotes'


// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]


//const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

//const initialState = anecdotesAtStart.map(asObject)


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers:{
    // createAnecdote(state, action) {
    //   console.log('reducer create anecdote aciton payload is ', action.payload);
    //   state.push(action.payload)
    // },
    vote(state, action) {
     // console.log('vote state', state)
      console.log('vote state', JSON.parse(JSON.stringify(state)));
      console.log('vote aciton', action)
      // const id = action.payload
      // const anecdoteToChange = state.find(anecdote => anecdote.id === id)
      // const changedAnecdote = {
      //   ...anecdoteToChange,
      //   votes: anecdoteToChange.votes + 1
      // }
      const changedAnecdote = action.payload
      const newState = state.map(a => a.id !== changedAnecdote.id ? a : changedAnecdote)
      newState.sort((a, b) => b.votes - a.votes)
      return newState

    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    }
  }

})


export const { appendAnecdote, vote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addVote = content => {
  return async dispatch => {
    const changedAnecdote = await anecdoteService.voteAnecdote(content)
    dispatch(vote(changedAnecdote))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer