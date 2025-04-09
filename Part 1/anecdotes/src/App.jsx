import { useState } from 'react'
import './App.css'

const Button = ({text, onClick}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

function App() {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(() => Array(anecdotes.length).fill(0))
  const [mostVotes, setMostVotes] = useState(0)

  const RandomNumber = () =>{
    let randomInt = Math.floor(Math.random() * anecdotes.length)
    
    setSelected(randomInt)
    
  }

  const Vote = () =>{

    const votesCopy = [...votes]
    votesCopy[selected] += 1

    setVotes(votesCopy)

    setMostVotes(votesCopy.indexOf(Math.max(...votesCopy)))
    
  }

  return (
    <>
        <h2>Anecdote of the day</h2>
        {anecdotes[selected]}
        <br />
        votes: {votes[selected]}
        <br /> <br />
        <Button text={"next anecdote"} onClick={RandomNumber} />
        <Button text={"Vote"} onClick={Vote} />

        <h2>Anecdote with most votes</h2>
        {anecdotes[mostVotes]}
        <br />
        votes: {votes[mostVotes]}
    </>
  )
}

export default App
