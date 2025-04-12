import { useState } from 'react'
import './App.css'

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

const People = ({filteredPersons}) => {
  return(
    <ul>
        {filteredPersons.map(person => <li key={person.id}>{person.name} - {person.number}</li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const [filter, setFilter] = useState('')

  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filter))

  const OnNameChange = (e) => setNewName(e.target.value)
  const OnNumberChange = (e) => setNewNumber(e.target.value)
  const OnFilterChange = (e) => setFilter(e.target.value)

  const OnNameSubmit = (e) => {

    e.preventDefault()    
    
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      alert(newName + ' is already on the list!')
      return
    }

    if (persons.some(person => person.number === newNumber)) {
      alert(newNumber + ' is already on the list!')
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
        
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onFilterChange={OnFilterChange}/>

      <AddPersonForm OnNameSubmit={OnNameSubmit} OnNameChange={OnNameChange} OnNumberChange={OnNumberChange} newName={newName} newNumber={newNumber}/>

      <h3>Numbers</h3>
      <People filteredPersons={filteredPersons} />

      
    </div>
  )
}

export default App