import React from 'react'

const Persons = (props) => {
  console.log(props)
  return (
    <div>
    {props.persons.filter(a => a.name.toLowerCase().includes(props.newFilter.toLowerCase()))
      .map((person, index) => <div
        key={index}>
        {person.name} {person.number}</div>)}
  </div>

  )
}

export default Persons