import React from 'react'

const PersonForm = (props) => {
  console.log(props)
  return (
    <form onSubmit={props.submit}>
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