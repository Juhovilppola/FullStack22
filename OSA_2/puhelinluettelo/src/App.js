import { useState } from 'react'
const ShowPersons = (person) => {
    return (
      <li>
        {person.person.name} {person.person.number}

      </li>
    )
  
}








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

  const AddPerson = (event) => {
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
      <div>
        Filter shown with <input
          value={newFilter}
          onChange={handleFilterChange}
        />
      </div>
      <h2>Add new</h2>
      <form onSubmit={AddPerson}>
        <div>
          name: <input
            value={newName}
            onChange={handlePersonChange}
          />
        </div>
        <div>
          number: <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
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
