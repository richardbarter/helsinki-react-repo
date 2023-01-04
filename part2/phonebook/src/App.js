import { useState, useEffect } from 'react'
import axios from 'axios'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {

  const [persons, setPersons] =  useState([]);
  
  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  console.log('show all state', showAll)

  const handleNameChange = (event) => {
    //console.log('on name change', event.target.value);
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    if(event.target.value !== ''){
      setShowAll(false)
    }else{
      setShowAll(true)
    }
  }

  const addPerson = (event) =>{
    console.log('in add person');
    event.preventDefault();
    //make sure name doens't alreayd exist
    //if already exists display alert() to user
    if(persons.some(person => person.name === newName)){
      console.log('found match');
      alert(`${newName} is already added to the phonebook`)
      return
    }
    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('');
        setNewNumber('');
      })
    
  }

  const deletePerson = (id) => {
    console.log('pressed delete. now delete id: ', id)
    const person = persons.find(p => p.id === id)
    console.log('person to delete is: ', person);
    const changedPerson = {...person }
    console.log('changed person is:', changedPerson);
    personService
      .removePerson(id)
      .then(response => {
        console.log('delete person response success');
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        alert(
          `the person '${person.name}' was already deleted from the server`
        )
        setPersons(persons.filter(p => p.id !== id))
      })
  }

  const personsToShow = showAll 
  ? persons 
  : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
    
      <Filter value={newFilter} onChange={handleFilterChange} />

      <h2>add a new</h2>

      <PersonForm 
        addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      {personsToShow.map(person =>
        <Person 
          key={person.id} 
          person={person}
          deletePerson={() => deletePerson(person.id)} />   
      )}

      {/* <Persons persons={personsToShow} /> */}
      
    </div>
  )
}

export default App
