import { useState, useEffect } from 'react'
import axios from 'axios'


const Country = ({ countries, filter }) => {

    const filteredCountries = countries.map(e => e.name.common)
          .filter(e => e.toLowerCase().includes(filter.toLowerCase()))
          .sort()

    if (filteredCountries.length > 10) {
      return (
        <div>Too many matches, specify another filter<br /></div>
      )
    } else if (filteredCountries.length == 1) {
      const oneCountry = countries[countries.findIndex(e => e.name.common === filteredCountries.toString())]
      return (
        <div>
          <br /><h1>{filteredCountries}</h1><br />
          capital {oneCountry.capital}<br />
          area {oneCountry.area}<br />
          <h3>languages:</h3>
          {Object.values(oneCountry.languages).map((e, i) => <li key={i}>{e}</li>)}<br />

          
          <img src={oneCountry.flags.png} height={'10%'} width={'10%'}></img>
        </div>
      )
    } else {
      return (
        <div>{filteredCountries.map((e, i) => <div key={i}>{e}</div>)}</div>
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

const App = () => {
  const [countries, setCountries] = useState([]) 
  const [filter, setFilter] = useState('') 
  
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

      <Country countries={countries} filter={filter}/>
      
    </div>
    
  )
}

export default App