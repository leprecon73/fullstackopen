const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
}
const Part = (props) => {
return (
  <div>
    <p>{props.p} {props.ex}</p>
  </div>
)
}
const Content = (props) => {
return (
  <>
    <Part p={props.p} ex={props.ex}/>
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
    
    <Content  p={part1} ex={exercises1}/>
    <Content  p={part2} ex={exercises2}/>
    <Content  p={part3} ex={exercises3}/>

    <Total ex1 = {exercises1} ex2 = {exercises2} ex3 = {exercises3}/>
  </div>
)
}

export default App


