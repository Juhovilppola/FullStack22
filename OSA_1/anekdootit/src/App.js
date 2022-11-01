import { useState } from 'react'
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState({
    anecdote: 0, votes: [0, 0, 0, 0, 0 , 0, 0], mostVotes: 0
  })
  
  const handleNext =()=>{

    const newClicks =  {
      ...selected,
      anecdote: (Math.floor(Math.random() * 7)),
  }
  setSelected(newClicks)
}

const handleVote =()=>{
  
  const newClicks =  {
    ...selected,
}
  newClicks.votes[newClicks.anecdote] += 1
  let i = 0
  let high = 0
  for(i;i<newClicks.votes.length - 1;i++){
    
    if(newClicks.votes[high] < newClicks.votes[i + 1]){
      high = i + 1;
      
    }
  }
 
  newClicks.mostVotes = high
  setSelected(newClicks)
}
  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected.anecdote]}
      <p>has {selected.votes[selected.anecdote]} votes</p>
      <p><Button handleClick={handleNext} text='next anecdote' /></p>
      <Button handleClick={handleVote} text='vote' />
      <h2>Anecdote with most votes</h2>
      {anecdotes[selected.mostVotes]}
      <p>has {selected.votes[selected.mostVotes]} votes</p>
    </div>
  )
}

export default App