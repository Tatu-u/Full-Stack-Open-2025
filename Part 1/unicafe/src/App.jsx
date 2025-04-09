import { useState } from 'react'
import './App.css'

const StatisticLine = ({name, value}) =>{
  return(
    <tbody>
      <tr>
        <td>{name}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  )
}

const Statistics = ({good, neutral, bad}) =>{
  let total = good + neutral + bad
  let average = (good - bad) / (good + neutral + bad)
  let positive = good / (good + neutral + bad) * 100

  if (total == 0) {
    return <div>No Feedback given</div>
  } else {
    return (
      <table>
        
        <StatisticLine name={"Good"} value = {good}/>
        <StatisticLine name={"Neutral"} value = {neutral}/>
        <StatisticLine name={"Bad"} value = {bad}/>
        <StatisticLine name={"All"} value = {total}/>
        <StatisticLine name={"Average"} value = {average.toFixed(2)}/>
        <StatisticLine name={"Positive"} value = {Math.round(positive) + "%"}/>
      </table>
    )
  }
    
  
}

const Button = ({name, onClick}) =>{
  return(
    <button onClick={onClick}>{name}</button>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const OnClickGood = () => setGood(good + 1)
  const OnClickNeutral = () => setNeutral(neutral + 1)
  const OnClickBad = () => setBad(bad + 1)

  return (
    <> 
      <div>
        <h1>Give Feedback</h1>
        <Button name = {"good"} onClick={OnClickGood}/>
        <Button name = {"Neutral"} onClick={OnClickNeutral}/>
        <Button name = {"Bad"} onClick={OnClickBad}/>
      </div>
        <h1>Statistics</h1>
        <Statistics good={good} neutral={neutral} bad={bad} />
  
     
    </>
  )
}

export default App
