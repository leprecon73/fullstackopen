import { useState, useEffect } from 'react'
import axios from 'axios'


const Country = ({ countries, filter, setOneCountry }) => {

    const filteredCountries = countries.map(e => e.name.common)
          .filter(e => e.toLowerCase().includes(filter.toLowerCase()))
          .sort()
    
    if (filteredCountries.length === 1) {
      setOneCountry(filteredCountries[0])      
    } else if (filteredCountries.length > 10) {
      setOneCountry('')
      return (
        <div>Too many matches, specify another filter<br /></div>
      )
    } else {
      return (
        <div>{filteredCountries.map((e, i) => <div key={i}>{e}<button onClick={() => setOneCountry(e)}>show</button></div>)}</div>
      )
    }
}

const Filter = ({filter, handleFilter}) => {
  return (
    <form >
        <div>
          find countries: <input 
            value={filter}
            onChange={handleFilter}
          />
        </div>
    </form>
  )
}

const OneCountry = ({oneCountry, countries}) => {
  if (oneCountry.length > 0) {

    const country = countries[countries.findIndex(e => e.name.common === oneCountry)]

    return (
    <div>
      <br /><h1>{oneCountry}</h1><br />
      capital {country.capital}<br />
      area {country.area}<br />
      <h3>languages:</h3>
      <ul>
      {Object.values(country.languages).map((e, i) => <li key={i}>{e}</li>)}<br />
      </ul>
      
      <img src={country.flags.png} height={'10%'} width={'10%'}></img>
    </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filter, setFilter] = useState('')
  const [oneCountry, setOneCountry] = useState('') 
  
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  
  return ( 
    <div> 
      <Filter filter={filter} handleFilter={handleFilter}/>

      <Country countries={countries} filter={filter} setOneCountry={setOneCountry}/>

      <OneCountry oneCountry={oneCountry} countries={countries}/>
    </div>
  )
}

export default App