import React, { useState } from 'react';
import '../styles/Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      console.log('Search:', searchQuery);
      // TODO: Navigate to search results
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <span className="brand-icon">🎬</span>
          <span className="brand-text">MovieDB</span>
        </div>

        <div className="navbar-center">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleSearch}
              className="search-input"
            />
          </div>
        </div>

        <div 
          className="navbar-menu-icon" 
          onClick={() => setIsOpen(!isOpen)}
          style={{ cursor: 'pointer', fontSize: '24px' }}
        >
          {isOpen ? '✕' : '☰'}
        </div>

        <div className={`navbar-links ${isOpen ? 'active' : ''}`}>
          <a href="#" className="nav-link">Home</a>
          <a href="#" className="nav-link">Trending</a>
          <a href="#" className="nav-link">Popular</a>
          <a href="#" className="nav-link">My Favorites</a>
        </div>
      </div>
    </nav>
  );
}