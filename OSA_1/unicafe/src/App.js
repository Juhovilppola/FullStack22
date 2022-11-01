import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const average = (good - bad) / all
  const positive = 100 * good / all

  if(all === 0){
    return(
      <div>
        no feedback given
      </div>
    )
  }
    return(
      <div>
        <h1>Statistics</h1>
        <table>
        <tbody>
        
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
    
        </tbody>
      </table>
      </div>
    )



}

const StatisticLine = ({text, value}) =>{
  return(
    <tr>
      <td>{text}:</td>
      <td>{value}</td> 
    </tr>
     
    
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleGood =()=>{
    setGood(good + 1)
  }
  const handleNeutral =()=>{
    setNeutral(neutral + 1)
  }
  const handleBad =()=>{
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give feedback!</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
      
    </div>
  )
}

export default App