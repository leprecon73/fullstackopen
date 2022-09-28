import { useState, useEffect } from 'react'
import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'


const Person = ({ person }) => {
  return (
    <div>{person.name} {person.number}</div>
  )
}

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

const Persons = ({filteredPersons}) => {
  return (
    <div>
      {filteredPersons.map(person =><Person key={person.id} person={person}/> )} 
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
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setFilteredPersons(persons) // my bugg's
      })
  }, [])

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


      // adding data through json server to db.json by lamer's way
      const request1 = axios.post(baseUrl, personObject)
      request1.then(response => response.data)
      const request2 = axios.put(`${baseUrl}/${personObject.id}`, personObject)
      request2.then(response => response.data)
      
    }
    
  }

  return ( 
    <div> 
      <h2>Phonebook</h2>
      <Filter addPerson={addPerson} newFilter={newFilter} handleFilter={handleFilter}/>

      <h2>add a new</h2>
      <PersonForm addPerson = {addPerson} newName = {newName} handleNameChange={handleNameChange}
                  newNumber = {newNumber} handleNumberChange = {handleNumberChange}/>
      
      <h2>Numbers</h2>
      <Persons filteredPersons = {filteredPersons} />
    </div>
    
  )
}

export default App