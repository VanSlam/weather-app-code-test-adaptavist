import React, { useState } from 'react'
import './NavBar.css'

function NavBar(props) {
  const [searchText, setSearchText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.onLocationChange(searchText)
    setSearchText('')
  }

  return (
    <div className='navbar'>
      <div className='navbar-title'>My Weather App</div>
      <div className='navbar-search'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Enter a city...'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className='navbar-search-input'
          />
          <button
            type='submit'
            className='navbar-search-button'
          >
            Search
          </button>
        </form>
      </div>
    </div>
  )
}

export default NavBar
