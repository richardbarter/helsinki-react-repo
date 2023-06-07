import { useDispatch } from "react-redux";
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
//import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    // const newAnecdote = await anecdoteService.createAnecdote(content)
    // dispatch(createAnecdote(newAnecdote))
    dispatch(createAnecdote(content))
    dispatch(setNotification(`created anecdote ${content}`, 5))
   
    //then timeout and wait 5 seconds and removeNotification? 
    //unsure of best practice way to do the setting and removing of notificaiton. 
    //maybe from withing notificaiton component, when it receives a setNotification it will display and then settimeout and dispatch the remove notificaiton.
  }

  return(
    <div>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )

}

export default AnecdoteForm