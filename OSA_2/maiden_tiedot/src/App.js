import { useState, useEffect } from 'react'
import axios from 'axios'
import FilterForm from './components/FilterForm'
//import ShowCountries from './components/ShowCountries'
const api_key = process.env.REACT_APP_API_KEY

const App = () => {
  const api_key = process.env.REACT_APP_API_KEY
  const [countries, setCountries] = useState([])
  const [weather, setWeather] = useState()
  const [newFilter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })

  }, [])

  



  console.log('render', countries.length, 'notes')




  const CountriesToShow = false
    ? countries
    : countries.filter(countries => countries.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }
  const ShowCountries = (props) => {
    console.log(props)
    console.log(props.countries.length)

    if (props.countries.length > 10) {
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )
    } else if (props.countries.length > 1 && props.countries.length < 10) {
      return (
        <ul>
          {props.countries.map(country =>
            <OneToTenCountries key={country.name.common} country={country} setFilter={props.setFilter} />
          )}
        </ul>
      )
    } else if (props.countries.length === 1) {



      let imageString = ''
      if (weather != null) {
        if (weather.name != props.countries[0].capital) {
          console.log('effect 1')
          axios
            .get(`https://api.openweathermap.org/data/2.5/weather?q=${props.countries[0].capital}&appid=${api_key}&units=metric`)
            .then(response => {
              console.log('promise fulfilled 2 ', response.data)
              setWeather(response.data)
              console.log(weather.name)
            })
        }
      } else {

        console.log('effect 2')
        axios
          .get(`https://api.openweathermap.org/data/2.5/weather?q=${props.countries[0].capital}&appid=${api_key}&units=metric`)
          .then(response => {
            console.log('promise fulfilled 2 ')
            setWeather(response.data)
            console.log(weather.name)
          })

      }

      if (weather != null) {
        console.log("wer", weather.name)
        imageString = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
        let array = []
        for (const i in props.countries[0].languages) {
          array.push(props.countries[0].languages[i])
        }



        return (
          <div>
            <h2>{props.countries[0].name.common}</h2>
            <p>Capital: {props.countries[0].capital}</p>
            <p>Area: {props.countries[0].area}</p>
            <h3>Languages:</h3>
            <ul>
              {array.map(language =>
                <GetLanguages key={language} language={language} />
              )}
            </ul>

            <img src={props.countries[0].flags.png} />
            <p>
              tempature {weather.main.temp} Celcius
            </p>
            <p>
              <img src={imageString} />
            </p>
            <p>
              Wind {weather.wind.speed} m/s
            </p>


          </div>
        )
      }
    } else {



      return (
        <li>


        </li>
      )
    }

  }
  const HandleFilter = (props) => {
    setFilter(props)
  }
  const OneToTenCountries = (props) => {
    console.log(props)
    return (
      <li>
        {props.country.name.common} <button onClick={() => HandleFilter(props.country.name.common)}>show </button>
      </li>
    )
  }
  const GetLanguages = (language) => {

    return (
      <li>
        {language.language}
      </li>
    )
  }


  return (
    <div>
      <FilterForm newFilter={newFilter} handleFilterChange={handleFilterChange} />

      <h2>Countries</h2>
      <ul>

        <ShowCountries countries={CountriesToShow} setFilter={setFilter} />

      </ul>

    </div>
  )

}

export default App

