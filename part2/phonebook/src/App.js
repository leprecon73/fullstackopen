import { useState } from 'react'
const Person = ({ person }) => {
  return (
    <div>{person.name} {person.number}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('') //The newName state is meant for controlling the form input element.
                                             //Sometimes it can be useful to render state and other variables as text for debugging purposes.
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [filteredPersons, setFilteredPersons] = useState(persons)

  const handleNameChange = (event) => {
    //console.log('handleNameChange: ',event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log('handleNumberChange: ',event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setNewFilter(event.target.value)
    
    if (event.target.value === '') { // newFilter === '' wont work, late by one symbol in <form>
      const fpersons = [...persons]
      setFilteredPersons(fpersons)
    } else {
      const fpersons = persons.filter(e => e.name.toLowerCase().includes(event.target.value.toLowerCase()))
      setFilteredPersons(fpersons)
    }
  }

  const addPerson = (event) => {
    event.preventDefault()  //The event handler immediately calls the event.preventDefault() method, which prevents
                            //the default action of submitting a form. The default action would, among other things, cause the page to reload.

    if (persons.some(el => el.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName, number: newNumber, id:persons[persons.length-1].id+1
       }
    
      setPersons(persons.concat(personObject))
      
      setFilteredPersons(persons.concat(personObject)) // ???
      
      setNewName('')
    }
    
  }

  return ( 
    <div> 
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          filter shown with: <input 
            value={newFilter}
            onChange={handleFilter}
          />
        </div>
      </form>

      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
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
      <div>
      {filteredPersons.map(person =>
          <Person key={person.name} person={person} />
        )}
      </div>
    </div>
    
  )
}

export default App