import React from 'react'

const Course = ({course}) => {
  
    return (
      <div>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} /> 
      </div>
    )
  }

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
  
export default Course