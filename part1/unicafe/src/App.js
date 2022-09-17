import { useState } from 'react'

const StatisticLine = (props) => {
  return (
    <tr><td>{props.text}</td><td>{props.value}</td></tr>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad} = props

  const checkStatistics = () => {
    if (bad+good+neutral === 0) {
      return (
        <div>
          No feedback given
        </div>
      )
    } 

    return (
      <div>
        <table>
          <StatisticLine text="good" value ={good} />
          <StatisticLine text="neutral" value ={neutral} />
          <StatisticLine text="bad" value ={bad} />
          
          <tr><td>all</td><td>{bad+good+neutral}</td></tr>
          <tr><td>average</td><td>{(bad * (-1) + good)/(bad+good+neutral)}</td></tr>
          <tr><td>positive</td><td>{(good/(bad+good+neutral)) * 100} %</td></tr>
        </table>
      </div>
    )
  }

  return (
    <div>
      <div><h1>statistics</h1></div>
      {checkStatistics()}
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>
        good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        bad
      </button>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App