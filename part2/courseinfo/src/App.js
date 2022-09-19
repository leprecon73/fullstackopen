const Header = (props) => {
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
  <Part p={props.parts[0]['name']} ex={props.parts[0]['exercises']}/>
  <Part p={props.parts[1]['name']} ex={props.parts[1]['exercises']}/>
  <Part p={props.parts[2]['name']} ex={props.parts[2]['exercises']}/>
</>
)
}
const Total = (props) => {

return (
  <div>
    <p>Number of exercises {props.parts[0]['exercises'] + props.parts[1]['exercises'] + props.parts[2]['exercises'] }</p>
  </div>
)
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

const Course = ({course}) => {
  return (
    <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        {/*<Total parts={course.parts} /> */}
    </div>
  )
}


export default App
