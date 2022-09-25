import { useState, useEffect } from 'react'
import axios from 'axios'

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

const Country = ({filteredCountries, filter, setFilteredCountries}) => {
  if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return (
      <div>{filteredCountries.map((e, i) => <div key={i}>{e}<button onClick={() => setFilteredCountries([e])}>show</button></div>)}</div>
    )
  } else if (filteredCountries.length > 10 && filter !== '') {
    return (
      <div>Too many matches, specify another filter<br /></div>
    )
  }
}

const OneCountry = ({filteredCountries, countries}) => {
  if (filteredCountries.length === 1) {
    const country = countries[countries.findIndex(e => e.name.common === filteredCountries[0])]
    return (
      <div>
        <br /><h1>{country.name.common}</h1><br />
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
  const [filteredCountries, setFilteredCountries] = useState([])
    
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
  
  const handleFilter = (event) => {
    setFilter(event.target.value)

    if (event.target.value === '') { 
      const fCountries = [...filteredCountries]
      setFilteredCountries(fCountries)
      } else {
      const fCountries = countries.map(e => e.name.common)
      .filter(e => e.toLowerCase().includes(event.target.value.toLowerCase()))
      .sort()
      setFilteredCountries(fCountries)
    }
  }
    
  return ( 
    <div> 
      <Filter countries={countries} filter={filter} handleFilter={handleFilter} filteredCountries={filteredCountries}/>
      <Country filteredCountries={filteredCountries} filter={filter} setFilteredCountries={setFilteredCountries}/>
      <OneCountry filteredCountries={filteredCountries} countries={countries}/>
    </div>
  )
}

export default App
