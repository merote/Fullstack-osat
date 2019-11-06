import React from 'react'

const PersonForm = (props) => {

  return (
    <form onSubmit={event => {
      event.preventDefault()
      props.addContact()
    }}>
      <div>
        name: <input
          value={props.name}
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