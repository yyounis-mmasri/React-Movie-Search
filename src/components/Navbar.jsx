import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

 const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <span className="navbar-icon">🎬</span>
            <span className="navbar-title">Movie Map</span>
          </div>
          
          <div className="navbar-links">
            <Link to="/" className="navbar-link">Home</Link>
            <Link to="/search" className="navbar-link">Search</Link>
            <Link to="/login" className="navbar-link">Log in</Link>
          </div>
          
          <div className="navbar-mobile-menu">
            <button className="navbar-mobile-button" aria-label="Toggle menu">
              <svg className="navbar-mobile-icon" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
//////
