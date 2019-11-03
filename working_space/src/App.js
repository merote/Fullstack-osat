import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Filter = (props) => {
  return (
    <div>
      Find countries: <input
        onChange={props.onChange}
        value={props.newFilter}
      />
    </div>
  )
}

const Countries = (props) => {
  
  const filtered_countries = props.countries.filter(
    a => a.name.toLowerCase().includes(props.newFilter.toLowerCase()))

        
    console.log(filtered_countries)
   

    return (
      <div>
        {filtered_countries.length === 1
          ? <Country country={filtered_countries[0]}></Country>
          : filtered_countries.length > 10 && props.newFilter !== ""
            ? <div>Too many matches, specify another filter</div>
            : filtered_countries
              .map((country, index) =>
                <form key ={index}>
                  <div>
                    {country.name}
                    <button type="button" onClick = {() => props.showCountry(country.name)}>show</button>
                  </div>
                </form>)}
      </div>
    )
}

const Country = ({country}) => {
  console.log("löyty")

  return (
    <div>
      <h1>{country.name}</h1>
      <div>{country.capital} </div>
      <div>{country.population} </div>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language, index) =>
          <li key={index}>{language.name}</li>)}
      </ul>
      <img src ={country.flag} alt="flag" height="100" width="100"></img>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  console.log(countries)

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
    console.log(newFilter)
  }

  const showCountry = (name) => {
    console.log(name)
    setNewFilter(name)     
  }



  return (
    <div>
      <Filter value={newFilter} onChange={handleFilterChange}></Filter>
      <Countries countries={countries} newFilter={newFilter} 
                  showCountry = {showCountry}>           
      </Countries>
    </div>
  )


}

export default App;