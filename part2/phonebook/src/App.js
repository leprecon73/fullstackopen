import { useState } from 'react'
const Person = ({ person }) => {
  return (
    <div>{person.name} {person.number}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('') //The newName state is meant for controlling the form input element.
                                             //Sometimes it can be useful to render state and other variables as text for debugging purposes.
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange = (event) => {
    console.log('handleNameChange: ',event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log('handleNumberChange: ',event.target.value)
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()  //The event handler immediately calls the event.preventDefault() method, which prevents
                            //the default action of submitting a form. The default action would, among other things, cause the page to reload.

    if (persons.some(el => el.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = {
        name: newName, number: newNumber             
      }
    
      setPersons(persons.concat(personObject))
      setNewName('')
    }
    
}

  return ( 
    <div> 
      <h2>Phonebook</h2>
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
        {persons.map(person =>
          <Person key={person.name} person={person} />
        )}
      </div>
    </div>
    
  )
}

export default App