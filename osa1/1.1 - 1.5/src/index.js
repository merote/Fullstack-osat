import React from 'react'
import ReactDOM from 'react-dom'


const Header = (props) => {
    return (
        <h1>{props.header}</h1>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part part={props.parts[0]} />
            <Part part={props.parts[1]} />
            <Part part={props.parts[2]} />
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

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    //const parts = [part1, part2, part3]
    //const exercises = [exercises1, exercises2, exercises3]  

    return (
        <div>
            <Header header={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))