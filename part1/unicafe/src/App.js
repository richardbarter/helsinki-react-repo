import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState(0)

  const handleGoodClick = () =>{
    setAll(allClicks + 1)
    setGood(good + 1)
  }
  const handleNeutralClick = () =>{
    setAll(allClicks + 1)
    setNeutral(neutral + 1)
  }
  const handleBadClick = () =>{
    setAll(allClicks + 1)
    setBad(bad + 1)

  }


  return (
    <div>
      <Heading text="give feedback" />
      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>
      <Heading text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={allClicks} />

      
    </div>
  )
}


const Heading = ({text}) => <><h2>{text}</h2></>

const StatisticLine = (props) => {
  return (

      <tr><td>{props.text}</td><td> {props.value}</td></tr>

  )
}

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  
  if(props.allClicks === 0){
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return(
    <table>
      <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.allClicks} />
        <StatisticLine text="average" value={(props.good - props.bad) / props.allClicks} />
        <StatisticLine text="positive" value={props.good / props.allClicks * 100} />
      </tbody>
      
    </table>
  )
}


export default App
