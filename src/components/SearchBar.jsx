
import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInput = (e) => setQuery(e.target.value);

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    } else {
      // Placeholder: log to console
      console.log('Searching for:', query);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="flex items-center gap-2 bg-neutral-800 rounded-full px-4 py-2 shadow-lg w-full max-w-md mx-auto mb-6 border border-gold-900/30">
      <svg className="w-5 h-5 text-gold-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
      <input
        type="text"
        placeholder="Search music, moods, or playlists..."
        className="bg-transparent outline-none text-gold-100 flex-1 placeholder-gold-400"
        value={query}
        onChange={handleInput}
        onKeyDown={handleKeyDown}
      />
      <button
        className="ml-2 px-3 py-1 rounded-full bg-premium-gold text-premium-black font-semibold hover:bg-premium-gold-dark transition"
        onClick={handleSearch}
        aria-label="Search"
      >Search</button>
    </div>
  );
};

export default SearchBar;
