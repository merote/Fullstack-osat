import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {

  const all = good + neutral + bad

  return (
    <div>
      {all === 0
        ? <div>No feedback given</div>
        : <table>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={all} />
            <Statistic text="average" value={(good + bad * (-1))/(all)} />
            <Statistic text="positive" value={(good / all).toString().concat(" %")} />
          </table>
      }
    </div>
  )
}

const Statistic = ({text, value}) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

 

  return (
    <div>
      <h1>give feedback</h1>
      <p></p>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <p></p>
      <h1>statistics</h1>
      <p></p>
      <Statistics good={good} neutral={neutral} bad={bad}/>


      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)