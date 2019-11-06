import React, { useState, useEffect } from 'react'
import Filter from './components/Filter.js'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import './index.css'

const Notification = ({ message }) => {    
  if (message.text === null) { 
    return null
  }
  console.log(message)
  return (
    <div className={message.failure ? "alertFailure" : "alert"}>
      {message.text}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [alertMessage, setAlertMessage] = useState({text: null, failure: false})


  useEffect(() => {
    personService
      .getAll()
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

  const handleAlert = (alert, name) => {
    const alerts = [`Added ${newName}`, `Removed ${name}`, `Updated number of ${newName}`,
    `Information of ${newName} has already been removed from server`]

    switch (alert) {
      case "ADD":
        setAlertMessage({text: alerts[0], failure: false})
        break;
      case "REMOVE":
        setAlertMessage({text: alerts[1], failure: false})
        break;
      case "UPDATE":
        setAlertMessage({text: alerts[2], failure: false})
        break;
      case "REMOVED_ALREADY":
        setAlertMessage({text: alerts[3], failure: true})
        break;
      default:
        break;    
    }
    setTimeout(() => {
      setAlertMessage({text: null, failure: false})
    }, 3000)
  }   

  const addContact = () => {    

    if (persons.map(a => a.name).includes(newName)) {
      const sameName = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`) 
        if (sameName === true)  {
          updateContact()
      }
    } else {   
    const personObject = {
      name: newName,
      number: newNumber,
    }  
    personService
      .create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          handleAlert('ADD')
 
      })
      .catch(error => {
        console.log('fail')
      })
    }
  }
    
  const removeContact = (id, name) => {
    personService
      .remove(id)
      .then(response => {       
        setPersons([...persons.filter(a => a.id !== id)])
        handleAlert('REMOVE', name)         
      })
      .catch(error => {
        console.log('fail')
      })    
  }  
    
   const updateContact = () => {
    const id_target = persons.filter(a => a.name === newName)[0].id

    const personObject = {
      name: newName,
      number: newNumber,
      id: id_target
    }

    personService
      .update(id_target, personObject)
      .then(response => {
        setPersons(persons.map(a => a.id !== id_target ? a : personObject))
        setNewName('')
        setNewNumber('')
        handleAlert('UPDATE')
      })
      .catch(error => {
        handleAlert("REMOVED_ALREADY")
      }) 
   } 
  
  
  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={alertMessage} />
      <Filter value={newFilter} onChange={handleFilterChange}></Filter>
      <h2>Add new</h2>
      <PersonForm name={newName} changeName={handleNameChange}
        number={newNumber} changeNumber={handleNumberChange}
        addContact={addContact} filter={newFilter} persons={persons}
        updateContact={updateContact}>
      </PersonForm>
      <h2>Numbers</h2>
      <Persons persons={persons} newFilter={newFilter}
        removeContact = {removeContact}></Persons>
    </div>
  )

}

export default App