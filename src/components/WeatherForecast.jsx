import React, { useState } from 'react';
import background from '../assets/01d.svg'

function WeatherForecast() {
  const [city, setCity] = useState('');
  const [forecastData, setForecastData] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      // const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&type=accurate&appid=3a240c3c7796882a67be4f12560c4afa`);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&type=accurate&appid=3a240c3c7796882a67be4f12560c4afa&cnt=20`);
      const data = await response.json();
      console.log(data)
      setForecastData(data.list);
      setSearched(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
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

  // return (
  //   <div className="weather-forecast">
  //     <div className="weather-header">
  //       <h1>Enter a City and State</h1>
  //       <form onSubmit={handleSubmit}>
  //         <input type="text" value={city} onChange={handleCityChange} placeholder="City, State" />
  //         <button type="submit">Search</button>
  //       </form>
  //     </div>
  //     <div className="weather-cards">
  //       {forecastData.map((item) => (
  //         <div className="weather-card" key={item.dt}>
  //           <img src={`../assets/${item.weather[0].icon}.svg`} alt="weather icon" />
  //           <p>{handleDate(item.dt)}</p>
  //       </div>
  //       ))}
  //     </div>
  //   </div>
  // );

  return (
    <div className="weather-forecast">
      {!searched ? ( // display search bar if search has not been performed
        <form onSubmit={handleSearch}>
          <h1>Enter a City and State</h1>
          <input
            type="text"
            placeholder="City, State"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      ) : (
        // display weather cards if search has been performed
        <div className="weather-cards">
          {forecastData.map((item) => (
            <div className="weather-card" key={item.dt}>
              <img src={`../src/assets/${item.weather[0].icon}.svg`} alt="weather icon" />
              <p>{handleDate(item.dt)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );



}

export default WeatherForecast;