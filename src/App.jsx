import { useState } from 'react'
import AppBar from './components/NavBar'
import background from './assets/pattern.svg'
import WeatherForecast from './components/WeatherForecast'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div style={{
      backgroundImage: `url(${background})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '100vh'
    }}>
      <AppBar></AppBar>
      <WeatherForecast></WeatherForecast>
    </div>
  )
}

export default App
