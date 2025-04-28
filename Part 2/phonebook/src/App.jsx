import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import phonebook from './services/phonebook'


const Filter = ({onFilterChange}) =>{
  return (
    <div>
      Filter by name: <input type="text" onChange={onFilterChange} id="" />
    </div>
  )
}

const AddPersonForm = (props) =>{
  return(
    <div>
      <form  onSubmit={props.OnNameSubmit}>
        <div>
          name: <input type='text' onChange={props.OnNameChange} value={props.newName}/>
          <br />
          number: <input type='text' onChange={props.OnNumberChange} value={props.newNumber}/>
        </div>
        <div>
          <button type="submit"  disabled={!props.newName || !props.newNumber}>add</button>
        </div>
      </form>
    </div>
  )
}

const People = ({filteredPersons, onDelete, onClickName}) => {
  return(
    <ul>
        {filteredPersons.map(person => <li onClick={() => onClickName(person.name, person.number)} key={person.id}>{person.name} - {person.number} <button onClick={()=> onDelete(person.id)}>del</button></li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const fetchPersons = () => {
    phonebook.getAll().then(res => setPersons(res))
  }

  useEffect(fetchPersons, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const [filter, setFilter] = useState('')

  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filter))

  const OnNameChange = (e) => setNewName(e.target.value)
  const OnNumberChange = (e) => setNewNumber(e.target.value)
  const OnFilterChange = (e) => setFilter(e.target.value)

  const OnNameSubmit = (e) => {

    e.preventDefault()    
    
    //Update the number if name exists
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      const toUpdate = window.confirm(`${newName} is already on the list, do you want to update their number?`)
      if (!toUpdate) return

      const personToUpdate = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
      const updatedPerson = {...personToUpdate, number: newNumber}
      phonebook.updatePerson(personToUpdate.id, updatedPerson)
      .then(updatedPerson => setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person)))
      
      setNewName('')
      setNewNumber('')

      return
    }


    const newPerson = {
      name: newName,
      number: newNumber
    }

    phonebook.createNew(newPerson).then(newPerson => setPersons(persons.concat(newPerson)))

    setNewName('')
    setNewNumber('')

  }

  const onDelete = (id) =>{
    const personToRemove = persons.find(person => person.id === id)
    const toDelete = window.confirm(`are you sure you want to remove ${personToRemove.name}?`)

    //if confirmation false just return
    if(!toDelete) return

    phonebook.deletePerson(id)
    .then(()=>setPersons(persons.filter(person => person.id !== id)))
    
  }

  //for easier editing
  const onClickName = (name, number) =>{
    setNewName(name)
    setNewNumber(number)
  }
  

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onFilterChange={OnFilterChange}/>

      <AddPersonForm OnNameSubmit={OnNameSubmit} OnNameChange={OnNameChange} OnNumberChange={OnNumberChange} newName={newName} newNumber={newNumber}/>

      <h3>Numbers</h3>
      <People onClickName={onClickName} onDelete={onDelete} filteredPersons={filteredPersons} />

      
    </div>
  )
}

export default App