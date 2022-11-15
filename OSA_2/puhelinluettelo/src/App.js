import { useState } from 'react'
import FilterForm from "./components/FilterForm"
import ShowPersons from "./components/ShowPersons"
import AddPersonForm from './components/AddPersonForm'






const App = () => {

  const [persons, setPersons] = useState([
    { id: 0, name: 'Arto Hellas', number: "040-1231244" }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  
  const personsToShow = false
  ? persons
  : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
  
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    const found = persons.find(element => element.name === newName)
    if (found) {
      alert(`${newName} is already added to phonebook`)
  
    } else {
      event.preventDefault()
      const id = persons.length
      console.log("button clicked", event.target)
      const personObj = {
        id: id,
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObj))
      setNewName('')
      setNewNumber('')
      console.log(persons)
    }
  }

  
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm newFilter={newFilter} handleFilterChange={handleFilterChange}/> 
      <h2>Add new</h2>
      <AddPersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange} handlePersonChange={handlePersonChange}/>
      
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <ShowPersons key={person.id} person={person} newfilter={newFilter} />
        )}
      </ul>

    </div>
  )

}

export default App
