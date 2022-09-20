import { useState } from 'react'
const Person = ({ person }) => {
  return (
    <div>{person.name}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('') //The newName state is meant for controlling the form input element.
                                             //Sometimes it can be useful to render state and other variables as text for debugging purposes.
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()      //The event handler immediately calls the event.preventDefault() method, which prevents
    const personObject = {      //the default action of submitting a form. The default action would, among other things, cause the page to reload.
      name: newName             
    }
  
    setPersons(persons.concat(personObject))
    setNewName('')
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