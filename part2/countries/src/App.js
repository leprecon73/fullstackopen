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

const Countries = ({filteredCountries, filter, handleClick}) => {
  if (filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return (
      <div>{filteredCountries.map((e, i) => <div key={i}>{e}<button onClick={() => handleClick(e)}>show</button></div>)}</div>
    )
  } else if (filteredCountries.length > 10 && filter !== '') {
    return (
      <div>Too many matches, specify another filter<br /></div>
    )
  }
}

const OneCountry = ({country}) => {
  const [weather, setWeather] = useState()
  const api_key = process.env.REACT_APP_API_KEY
  const wurl = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${country.capital}&aqi=no`

  
  useEffect(() => {
    if(!country?.name){
      return 
    }

    axios
      .get(wurl)
      .then(response => {
        setWeather(response.data)
      })
  }, [country])
  
  if (!weather || !country?.name) { 
    return null 
  }
  
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
      <h3>Weather in {country.capital}</h3>
      temperature {weather.current.temp_c} Celcius<br /><br /> 
      <img src={weather.current.condition.icon}></img><br />
      wind {(weather.current.wind_kph * 0.277778).toFixed(2)} m/s<br />

    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [country, setCountry] = useState({})
      
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
        
      })
  }, [])
  
  const handleFilter = (event) => {
    setFilter(event.target.value)
    setCountry({})
    if (event.target.value === '') { 
      const fCountries = [...filteredCountries]
      setFilteredCountries(fCountries)
    } else {
      const fCountries = countries.map(e => e.name.common)
      .filter(e => e.toLowerCase().includes(event.target.value.toLowerCase()))
      .sort()
      
      setFilteredCountries(fCountries) // watch out! WATCH OUT!!!!
      
      if(fCountries.length === 1) {    // watch out! WATCH OUT!!!! not filteredCountries
        setCountry(countries[countries.findIndex(e => e.name.common === fCountries[0])])
      } else {
        setCountry({})
      }
    }
  }

  const handleClick = (event) => {
    setFilter(event)
    setCountry(countries[countries.findIndex(e => e.name.common === event)])
  }
  return ( 
    <div> 
      <Filter countries={countries} filter={filter} handleFilter={handleFilter} filteredCountries={filteredCountries}/>
      <Countries filteredCountries={filteredCountries} filter={filter} handleClick={handleClick}/>
      <OneCountry country={country}/>
    </div>
  )
}

export default App

