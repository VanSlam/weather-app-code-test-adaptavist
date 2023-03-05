import React, { useState } from 'react'
import MyAppBar from './components/NavBar'
import WeatherForecast from './components/WeatherForecast'
import background from './assets/pattern.svg'

function App() {
  const [location, setLocation] = useState('')

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation)
  }

  return (
    <div
      className='App'
      style={{ backgroundImage: `url(${background})` }}
    >
      <link
        href='https://fonts.googleapis.com/css2?family=Open+Sans&display=swap'
        rel='stylesheet'
      />
      <MyAppBar onLocationChange={handleLocationChange} />
      <WeatherForecast
        key={location}
        location={location}
        setLocation={setLocation}
      />
    </div>
  )
}

export default App
