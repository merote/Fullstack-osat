import React from 'react'

const PersonForm = (props) => {

  return (
    <form onSubmit={props.persons.map(a => a.name).includes(props.name) === true
      ? () => window.alert(`${props.name} is already added to phonebook`) 
      : props.submit}>
    <div>
    name: <input
      value={props.Name}
      onChange={props.changeName} />
      </div>
      <div>
     number: <input
      value={props.number}
      onChange={props.changeNumber} />  
    </div>
    <button type="submit">add</button>
  </form>
  )
}

export default PersonForm;