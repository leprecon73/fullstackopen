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
    
    <Content  p={part1['name']} ex={part1['exercises']}/>
    <Content  p={part2['name']} ex={part2['exercises']}/>
    <Content  p={part3['name']} ex={part3['exercises']}/>

    <Total ex1 = {part1['exercises']} ex2 = {part2['exercises']} ex3 = {part3['exercises']}/>
  </div>
)
}

export default App
