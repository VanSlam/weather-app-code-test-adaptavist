import React, { useState } from 'react';
import background from '../assets/01d.svg';
import './WeatherForecast.css';

function WeatherForecast() {
  const [city, setCity] = useState("");
  const [forecastData, setForecastData] = useState([]);
  const [showCards, setShowCards] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showSearchForm, setShowSearchForm] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&type=accurate&appid=3a240c3c7796882a67be4f12560c4afa&cnt=20`);
      const data = await response.json();
      console.log(data)
      setForecastData(data.list);
      setShowCards(true);
      setShowSearchForm(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDate = (dt) => {
    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    const dateString = new Date(dt * 1000).toLocaleDateString('en-US', dateOptions);
    const dayOfMonth = dateString.split(' ')[2];
    let suffix;
  
    if (dayOfMonth === '1' || dayOfMonth === '21' || dayOfMonth === '31') {
      suffix = 'st';
    } else if (dayOfMonth === '2' || dayOfMonth === '22') {
      suffix = 'nd';
    } else if (dayOfMonth === '3' || dayOfMonth === '23') {
      suffix = 'rd';
    } else {
      suffix = 'th';
    }
  
    return (dateString + suffix);
  };

  const handleCardClick = (card) => {
    console.log('card: ' + JSON.stringify(card))
    setSelectedCard(card);
    setShowCards(false); // hide the 5 cards
  };

const getUniqueDays = () => {
    const uniqueDays = [];
    forecastData.forEach((item) => {
      const day = new Date(item.dt * 1000).toLocaleDateString(undefined, { weekday: "long" });
      console.log('days: '+ day)
      if (!uniqueDays.includes(day)) {
        uniqueDays.push(day);
      }
    });
    return uniqueDays.slice(0, 5);
  };
  
  
  const getCardsForDay = (day) => {
    const filteredData = forecastData.filter((item) => {
      const itemDay = new Date(item.dt * 1000).toLocaleDateString(undefined, { weekday: "long" });
      return itemDay === day;
    });
    return filteredData[0];
  };
  

  const getTemp = (temp) => {
    return(Math.round((temp - 273.15) * 9/5 + 32));
  };
  

  return (
    <div className="weather-container">
      {showSearchForm && (
      <div className="weather-input">
        <h1>Enter a City and State</h1>
        <form className="search-container" onSubmit={handleSubmit}>
          <input type="text" placeholder="City, State" onChange={(e) => setCity(e.target.value)} />
          <button className="search-button" type="submit">Search</button>
        </form>
      </div>
      )}
      {showCards && (
        <div className="weather-cards-container">
          {getUniqueDays().map((day, index) => (
            <div className="weather-card" key={index} onClick={() => handleCardClick(getCardsForDay(day))}>
              <img src={`../src/assets/${getCardsForDay(day).weather[0].icon}.svg`} alt="weather icon" />
              {/* <img src={`../src/assets/${item.weather[0].icon}.svg`} alt="weather icon" /> */}
              <p>{handleDate(getCardsForDay(day).dt)}</p>
            </div>
          ))}
        </div>
      )}
      {selectedCard && (
        <div className="selected-card">
          <h2>{`${city}, ${new Date(selectedCard.dt * 1000).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}`}</h2>
          <p>Weather: {selectedCard.weather[0].description}</p>
          <p>Min Temperature: {getTemp(selectedCard.main.temp_min)}°F</p>
          <p>Max Temperature: {getTemp(selectedCard.main.temp_max)}°F</p>
          <p>Humidity: {selectedCard.main.humidity}%</p>
          <button onClick={() => (setSelectedCard(null), setShowSearchForm(true))}>Close</button>
        </div>
      )}
    </div>
  );
}

export default WeatherForecast;
