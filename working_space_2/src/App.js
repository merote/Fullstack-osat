import React, { useState } from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')


  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value) 
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    //console.log(event.target.value)
    setNewFilter(event.target.value)
    console.log(newFilter)
  }

  const addContact = (event) => {
    event.preventDefault()
    if (persons.map(a => a.name).includes(newName) === true) {
      console.log("löyty")
      window.alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons([...persons, {name: newName, number: newNumber}])   
    console.log(event.target)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange}></Filter>
      <h2>Add new</h2>
      <PersonForm name={newName} changeName={handleNameChange}
        number={newNumber} changeNumber={handleNumberChange}
        submit={addContact}>
      </PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} ></Persons>
    </div>
  )

}

export default App