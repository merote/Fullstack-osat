import React from 'react'

const Filter = (props) => {
  console.log(props)
  return (
    <div>
      filter shown with: <input
        onChange={props.onChange}
        value={props.newFilter}
      />
    </div>
  )
}

export default Filter;