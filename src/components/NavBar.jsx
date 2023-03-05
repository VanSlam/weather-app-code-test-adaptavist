import React, { useState } from 'react';

function MyAppBar({ onLocationChange }) {
  const [searchText, setSearchText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLocationChange(searchText);
    setSearchText('');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', backgroundColor: '#f2f2f2' }}>
      <div style={{ flex: 1 }}>
        My Weather App
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <form onSubmit={handleSubmit}>
          <input 
            type="text"
            placeholder="Enter a location.."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginRight: '8px' }}
          />
          <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '3px', padding: '8px 12px', cursor: 'pointer' }}>
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default MyAppBar;
