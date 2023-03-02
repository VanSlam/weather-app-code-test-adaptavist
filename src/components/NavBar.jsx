import React, { useState } from 'react';

function MyAppBar() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Do something with the search value, such as fetching search results from an API
    setSearchValue('');
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', backgroundColor: '#f2f2f2' }}>
      <div style={{ flex: 1 }}>
        My Weather App
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <form onSubmit={handleSearchSubmit}>
          <input type="text" placeholder="Search..." value={searchValue} onChange={(e) => setSearchValue(e.target.value)} style={{ marginRight: '8px' }} />
          <button type="submit" style={{ backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '3px', padding: '8px 12px', cursor: 'pointer' }}>
            Search
          </button>
        </form>
      </div>
    </div>
  );
}

export default MyAppBar;
