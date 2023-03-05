import React, { useState, useEffect } from 'react'
import './WeatherForecast.css'

function WeatherForecast({ location, setLocation}) {
  const [city, setCity] = useState(location)
  const [forecastData, setForecastData] = useState([])
  const [showCards, setShowCards] = useState(false)
  const [selectedCard, setSelectedCard] = useState(null)
  const [showSearchForm, setShowSearchForm] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (location) {
      setCity(location)
      handleSubmit()
    }
  }, [location])

  const handleSubmit = async (e) => {
    e?.preventDefault()
    try {
      const API_KEY = import.meta.env.VITE_API_KEY
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&type=accurate&appid=${API_KEY}`
      )
      const data = await response.json()
      if (data.cod === '200') {
        setForecastData(data.list)
        setShowCards(true)
        setShowSearchForm(false)
        setErrorMessage('')
      } else {
        setErrorMessage(data.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
    setShowCards(false)
  }

  const getUniqueDays = () => {
    const uniqueDays = [
      ...new Set(
        forecastData.map((item) =>
          new Date(item.dt * 1000).toLocaleDateString(undefined, {
            weekday: 'long',
          })
        )
      ),
    ]
    return uniqueDays.slice(0, 5)
  }

  const getCardsForDay = (day) => {
    return forecastData.find(
      (item) =>
        new Date(item.dt * 1000).toLocaleDateString(undefined, {
          weekday: 'long',
        }) === day
    )
  }

  const getTemp = (temp) => {
    return Math.round(((temp - 273.15) * 9) / 5 + 32)
  }

  return (
    <div className='weather-container'>
      {showSearchForm && (
        <div className='weather-input'>
          <h1 className='search-label'>Enter a City and State</h1>
          <form
            className='search-container'
            onSubmit={handleSubmit}
          >
            <input
              type='text'
              placeholder='Enter a city...'
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              className='search-button'
              type='submit'
            >
              Search
            </button>
          </form>
        </div>
      )}
      {errorMessage && (
        <div className='error-message'>
          <p>{errorMessage}</p>
        </div>
      )}
      {showCards && (
        <div>
        <h1 className='card-title'>{`${city}`}</h1>
        <div className='weather-cards-container'>
          {getUniqueDays().map((day, index) => (
            <div
              className='weather-card'
              key={index}
              onClick={() => handleCardClick(getCardsForDay(day))}
            >
              <img
                src={`../src/assets/${getCardsForDay(day).weather[0].icon}.svg`}
                alt='weather icon'
              />
              <p>
                {new Date(getCardsForDay(day).dt * 1000).toLocaleDateString(
                  undefined,
                  { weekday: 'long', month: 'short', day: 'numeric' }
                )}
              </p>
            </div>
          ))}
        </div>
        </div>
      )}
      {selectedCard && (
        <div className='selected-card'>
          <img className='selected-card-icon'src={`../src/assets/${selectedCard.weather[0].icon}.svg`} alt="weather icon" />
          <h2>{`${new Date(selectedCard.dt * 1000).toLocaleDateString(
            undefined,
            { weekday: 'long', month: 'short', day: 'numeric' }
          )}`}</h2>
          <p>{city}</p>
          <p>{selectedCard.weather[0].description}</p>
          <p>Min Temp: {getTemp(selectedCard.main.temp_min)}°F</p>
          <p>Max Temp: {getTemp(selectedCard.main.temp_max)}°F</p>
          <p>Humidity: {selectedCard.main.humidity}%</p>
          <button
            onClick={() => (setSelectedCard(null), setShowSearchForm(true), setCity(''), setLocation(''))}
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}

export default WeatherForecast
