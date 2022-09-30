import { useState, useEffect } from 'react'
import Backend from './components/Backend'


const PersonForm = ({addPerson,newName,handleNameChange,newNumber,handleNumberChange}) => {
  return (
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
  )
}

const Persons = ({filteredPersons, handleDeleteClick}) => {
  return (
    <div>
      {filteredPersons.map(person =><li key={person.id}> {person.name} {person.number} 
        <button onClick={() => handleDeleteClick(person.id)}>delete</button>
      </li> )} 
    </div>
  )
}

const Filter = ({addPerson, newFilter, handleFilter}) => {

  return (
    <form onSubmit={addPerson}>
        <div>
          filter shown with: <input 
            value={newFilter}
            onChange={handleFilter}
          />
        </div>
    </form>
  )

}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('') //The newName state is meant for controlling the form input element.
                                             //Sometimes it can be useful to render state and other variables as text for debugging purposes.
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  const [filteredPersons, setFilteredPersons] = useState([])
  
  useEffect(() => {
    Backend
      .getAll()
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(persons)
      })
  }, [])

  const handleDeleteClick = (id) => {
    setPersons(persons.filter(person => person.id !== id))
    setFilteredPersons(persons.filter(person => person.id !== id))

    if (window.confirm(`Delete ${id}`)) {
      Backend
        .del(id)
    } 
  }

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
    //                        the default action of submitting a form. The default action would, among other things, cause the page to reload.
    
    if (persons.some(el => el.name === newName)) {
      
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

        Backend
         .del(persons.find(el => el.name === newName).id)

         const newPerson = {
          name: newName, number: newNumber, id:persons[persons.length-1].id+1
         }
        // must be - in one operation: delete element, then add new 
        setPersons(persons.filter(el => el.name !== newName).concat(newPerson))
        setFilteredPersons(persons.filter(el => el.name !== newName).concat(newPerson)) 
                      
        Backend
          .create(newPerson)    
          .then(response => response.data)
        Backend
          .update(newPerson.id, newPerson)
          .then(response => response.data)
        
        setNewName('')
        setNewNumber('')
      } 
    } else {
      const newPerson = {
        name: newName, number: newNumber, id:persons[persons.length-1].id+1
       }
    
      setPersons(persons.concat(newPerson))
      setFilteredPersons(persons.concat(newPerson)) 
      setNewName('')
      setNewNumber('')
      
      Backend
        .create(newPerson)    
        .then(response => response.data)
      Backend
        .update(newPerson.id, newPerson)
        .then(response => response.data)
    }
  }

  return ( 
    <div> 
      <h2>Phonebook</h2>
      <Filter addPerson={addPerson} newFilter={newFilter} handleFilter={handleFilter}/>

      <h2>add a new</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange}
                  newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} handleDeleteClick={handleDeleteClick}/>
    </div>
    
  )
}

export default App
