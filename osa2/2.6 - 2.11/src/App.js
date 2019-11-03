import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addContact = (event) => {
    event.preventDefault()
    setPersons([...persons, {name: newName, number: newNumber}])   
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newFilter} onChange={handleFilterChange}></Filter>
      <h2>Add new</h2>
      <PersonForm name={newName} changeName={handleNameChange}
        number={newNumber} changeNumber={handleNumberChange}
        submit={addContact} filter={newFilter} persons={persons}>
      </PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter} ></Persons>
    </div>
  )

}

export default App