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
const Content = ({parts}) => {
  
return (
<div>
  <Part p={parts[0]['name']} ex={parts[0]['exercises']}/>
  <Part p={parts[1]['name']} ex={parts[1]['exercises']}/>
  <Part p={parts[2]['name']} ex={parts[2]['exercises']}/>
  <Part p={parts[3]['name']} ex={parts[3]['exercises']}/>
</div>
)
}
const Total = ({parts}) => {
  const exercisesSum = parts.map(x => x['exercises']).reduce((x,y) => (x+y)) // last year I passed course Scala at cs.aalto.fi

return (
  <div>
    <p><b>Total of {exercisesSum} exercises</b></p>
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
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
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
        <Total parts={course.parts} /> 
    </div>
  )
}


export default App
