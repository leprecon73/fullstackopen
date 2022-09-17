import { useState } from 'react'

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
        <div>good {good}</div>
        <div>neutral {neutral}</div>
        <div>bad {bad}</div>
        <div>all {bad+good+neutral}</div>
        <div>average {(bad * (-1) + good)/(bad+good+neutral)}</div>
        <div>positive {(good/(bad+good+neutral)) * 100} %</div>
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