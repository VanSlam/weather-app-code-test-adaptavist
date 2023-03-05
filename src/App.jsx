import React, { useState } from 'react';
import MyAppBar from './components/NavBar';
import WeatherForecast from './components/WeatherForecast';
import background from './assets/pattern.svg';

function App() {
  const [location, setLocation] = useState("");

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  return (
    <div className="App" style={{backgroundImage: "url(" + "../src/assets/pattern.svg" + ")"}}>
      <MyAppBar onLocationChange={handleLocationChange} />
      <WeatherForecast key={location} location={location} />
    </div>
  );
}

export default App;
