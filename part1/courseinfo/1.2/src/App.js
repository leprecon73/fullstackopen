const Header = (props) => {
  return (
    <div>
      <h1><p>{props.course}</p></h1>
    </div>
  )
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
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      
      <Content  p1={part1} ex1={exercises1}/>
      <Content  p2={part2} ex2={exercises2}/>
      <Content  p3={part3} ex3={exercises3}/>

      <Total ex1 = {exercises1} ex2 = {exercises2} ex3 = {exercises3}/>
    </div>
  )
}

export default App
