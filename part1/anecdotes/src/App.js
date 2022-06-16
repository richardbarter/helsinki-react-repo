import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]


  const [points, setPoints] = useState(new Uint8Array(7))

  console.log('initialize points', points)
 
  const [selected, setSelected] = useState(0)


  const handleAnecdoteClick = () => {
    
    const ran_num = Math.floor(Math.random() * 7)

    setSelected(ran_num);
  }

  const handleVoteClick = () => {
    console.log('selectedis: ', selected)
    //for some reason the first click to vote doesn't update the array properly.
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
    //this doesn't display updated points until the app is rerendered? 
      //upon investigation, it is true that changes are only reflected when component re-renders, which is why it does not reflect in below. 
    console.log('points: ', points)
  }
  
  const getMaxVoteText = () => {
    const max = Math.max(...points)
    const index = points.indexOf(max)
    return anecdotes[index]
  }
  

  return (
    <div>
      <Heading text="Anecdote of the day" />
      <DisplayText text={anecdotes[selected]} />
      <Button onClick={handleVoteClick} text="vote" />
      <Button onClick={handleAnecdoteClick} text="next anecdote" />
      <Heading text="Anecdote with most votes" />
      <DisplayText text={getMaxVoteText()} />
      
    </div>
  )
}

const Heading = ({text}) => <h2>{text}</h2>

const DisplayText = ({text}) => <div>{text}</div>

const Button = (props) => (
    <button onClick={props.onClick}>
      {props.text}
    </button>
)

export default App