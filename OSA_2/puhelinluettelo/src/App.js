import { useState, useEffect } from 'react'
import FilterForm from "./components/FilterForm"
import ShowPersons from "./components/ShowPersons"
import AddPersonForm from './components/AddPersonForm'
import personService from './services/persons'
import './index.css'





const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(resonse => {
        setPersons(resonse.data)
      })
  }, [])


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

  const addPerson = event => {
    const found = persons.find(element => element.name === newName)
    console.log("found", found)
    event.preventDefault()
    if (found) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        const changedPerson = { ...found, number: newNumber }
        personService
          .update(found.id, changedPerson).then(response => {
            console.log(response)
            setPersons(persons.map(person => person.id !== found.id ? person : response))
            const errorObj = {
              message: `Changed number of ${found.name}`,
              error: false
            }
            setErrorMessage(errorObj)
            setTimeout(() => {
              setErrorMessage(null)
            }, 2000)
            setNewName('')
            setNewNumber('')
              
          })
          .catch(error => {
            console.log('fail')
            const errorObj = {
              message: `Failed to Change number of ${found.name} because it person has been deleted`,
              error: true
            }
            setErrorMessage(errorObj)
            setTimeout(() => {
              setErrorMessage(null)
            }, 2000)
            setPersons(persons.filter(p => p.id !== found.id))
          })
        
      }

    } else {


      console.log("button clicked", event.target)
      const personObj = {

        name: newName,
        number: newNumber,

      }
      personService
        .create(personObj)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          const errorObj = {
            message: `Added ${personObj.name}`,
            error: false
          }
          setErrorMessage(errorObj)
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
        })
      

    }
  }

  const removePerson = (person) => {

    //event.preventDefault()
    console.log("removePerson", person.id)
    if (window.confirm("Delete " + person.name + "?")) {
      personService
        .remove(person.id)
        .then(response => {
          personService
            .getAll()
            .then(resonse => {
              setPersons(resonse.data)
              const errorObj = {
                message: `Removed  ${person.name}`,
                error: false
              }
              setErrorMessage(errorObj)
              setTimeout(() => {
                setErrorMessage(null)
              }, 2000)
            })
        })
        .catch(error => {
          console.log('fail')
          const errorObj = {
            message: `Failed to delete ${person.name} because it person has been deleted from the server`,
            error: true
          }
          setErrorMessage(errorObj)
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
          setPersons(persons.filter(p => p.id !== person.id))
        })
    
    }
    //console.log(persons)
  }
  const Button = (props) => {
    console.log("props", props.person.id)
    return (
      <button onClick={() => removePerson(props.person)}>
        delete
      </button>
    )
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }
    if (!message.error) {
      return (
        <div className="noterror">
          {message.message}
        </div>
      )
    } else {
      return (
        <div className="error">
          {message.message}
        </div>
      )
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <FilterForm newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add new</h2>
      <AddPersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNumberChange={handleNumberChange} handlePersonChange={handlePersonChange} />

      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <ShowPersons key={person.id} person={person} newfilter={newFilter} button={<Button person={person} />} />
        )}
      </ul>

    </div>
  )

}

export default App
