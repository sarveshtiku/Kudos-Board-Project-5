import React from 'react';
import './SearchBar.css';

function SearchBar({ value, onChange, onSearch }) {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="🔍 looking for something?"
        value={value}
        onChange={onChange}
        className="search-input"
      />
      <button onClick={onSearch} className="search-button">Go!</button>
    </div>
  );
}

export default SearchBar;