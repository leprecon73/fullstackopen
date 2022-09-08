const Header = (props) => {
    console.log(props)
    return <h1>{props.course}</h1>
}
const Part = (props) => {
  return (
    <div>
      <p>{props.p1} {props.ex1}</p>
      <p>{props.p2} {props.ex2}</p>
      <p>{props.p3} {props.ex3}</p>
    </div>
  )
}
const Content = (props) => {
  return (
    <>
      <Part p1={props.p1} ex1={props.ex1}/>
      <Part p2={props.p2} ex2={props.ex2}/>
      <Part p3={props.p3} ex3={props.ex3}/>
    </>
  )
}
const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.ex1 + props.ex2 + props.ex3}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course={course}/>
      
      <Content  p1={part1['name']} ex1={part1['exercises']}/>
      <Content  p2={part2['name']} ex2={part2['exercises']}/>
      <Content  p3={part3['name']} ex3={part3['exercises']}/>

      <Total ex1 = {part1['exercises']} ex2 = {part2['exercises']} ex3 = {part1['exercises']}/>
    </div>
  )
}

export default App