import React from 'react'


const Persons = (props) => {

  return (
    <table>
      <tbody>
        {props.persons.filter(a => a.name.toLowerCase().includes(props.newFilter.toLowerCase()))
          .map((person, index) => 
          <tr key={index}>
            <td>{person.name}</td>
            <td>{person.number}</td>
            <td><button type="button" 
                onClick = {() => window.confirm(`delete ${person.name}`) ? props.removeContact(person.id, person.name): null }>
              delete</button></td>
          </tr>
          )}
      </tbody>
    </table>
  )
}

export default Persons