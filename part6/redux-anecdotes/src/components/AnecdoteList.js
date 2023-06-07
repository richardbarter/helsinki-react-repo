import { useDispatch, useSelector } from "react-redux"
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, handleVote }) => {
  return(
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  console.log('before ancedoes useSelector');
  //const anecdotes = useSelector(state => state.anecdotes)
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    console.log('anecdotes are', anecdotes);
    console.log('filter is ', filter);

    return filter === ''
    ? anecdotes
    : anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const handleVote = (anecdote) => {
    console.log('handle vote')
    console.log('anecdote is', anecdote);
    //dispatch(vote(id))
    dispatch(addVote(anecdote))

    dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
    // setTimeout(() => {
    //   dispatch(removeNotification())
    // }, 5000)

  }

  return(
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote=> 
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleVote={() => handleVote(anecdote)}
          // handleVote={() => dispatch(vote(anecdote.id))}
        />
      )}
    </div>
  )
}

export default AnecdoteList