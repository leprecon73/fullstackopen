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
   {parts.map( part  => <Part key={part.id} p={part.name} ex={part.exercises}/> )}
  </div>
)
}
const Total = ({parts}) => {
  // already done
  const exercisesSum = parts.map(x => x['exercises']).reduce((x,y) => (x+y)) // last year I passed course Scala at cs.aalto.fi

return (
  <div>
    <p><b>Total of {exercisesSum} exercises</b></p>
  </div>
)
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
  <div> 
    <h1>Web development curriculum</h1>
   {courses.map( course  => <Course key={course.id} course={course} parts={course.parts}/> )}
  </div>
  )
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
