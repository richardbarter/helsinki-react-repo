//import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'


import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'



const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])
  
  return (
    <div>
      <h2>create new</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>  
  )

  // return (
  //   <div>
  //     <h2>Anecdotes</h2>
  //     {anecdotes.map(anecdote =>
        // <div key={anecdote.id}>
        //   <div>
        //     {anecdote.content}
        //   </div>
        //   <div>
        //     has {anecdote.votes}
        //     <button onClick={() => vote(anecdote.id)}>vote</button>
        //   </div>
        // </div>
  //     )}
  //     <h2>create new</h2>
  //     <form>
  //       <div><input /></div>
  //       <button>create</button>
  //     </form>
  //   </div>
  // )
}

export default App