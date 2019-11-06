import axios from 'axios'
import React, { useState, useEffect } from 'react'

const Filter = (props) => {
  return (
    <p>
      Find countries: <input
        onChange={props.onChange}
        value={props.newFilter}
      />
    </p>
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
      <div>capital {country.capital} </div>
      <div>population {country.population} </div>
      <h2>languages</h2>
      <ul>
        {country.languages.map((language, index) =>
          <li key={index}>{language.name}</li>)}
      </ul>
      <img src ={country.flag} alt="flag" height="100" width="100"></img>
      <Weather capital = {country.capital}></Weather>    
    </div>
  )
}

const Weather = ({capital}) => {
  
  const [weather, setWeather] = useState({temperature:'', wind_speed:'',wind_direction:'', icon:''})

  
useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=a3715b4be664170eb8f117481187edad&query=${capital}`)
      .then(response => {
        const data = response.data.current
        console.log(data)
        setWeather({temperature: data.temperature, wind_speed:data.wind_speed,
            wind_direction: data.wind_dir, icon: data.weather_icons[0]})
        //console.log(weather)
      })
  }, [])



  console.log(weather)
  
  return (
    <div>
      <h2>Weather in {capital} </h2>
      <p><b>temperature:</b> {weather.temperature} Celsius</p>
      <img src ={weather.icon} alt="wind" height="50" width="50"></img>
      <p><b>wind:</b> {weather.wind_speed} kph direction {weather.wind_direction} </p>
    </div>
  ) 
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  //const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])



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
      {}
    </div>
  )


}

export default App;