import React from 'react'

const Course = ({course}) => {
  return (
    <div>
      <Header header = {course.name}/>
      <Content parts = {course.parts}/>
      <h3><Total parts={course.parts}/></h3> 
    </div>
  )
}

const Header = (props) => {
  return (
      <h2>{props.header}</h2>
  )
}

const Content = (props) => {
  console.log(props)
  return (
      <div>
          {props.parts.map((part) => (
            <Part key = {part.id} part={part}/>))}     
      </div>
  )
}

const Part = (props) => {
  return (
      <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Total = (props) => {
  //mapin ja reducen avulla erotellaan numerot oliosta ja lasketaan yhteen
  const numbers = props.parts.map(item => item.exercises)
  return (
      <p>Number of exercises {numbers.reduce((a, b) => a + b, 0)}</p>
  )
}

export default Course;
