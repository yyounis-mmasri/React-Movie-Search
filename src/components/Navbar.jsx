const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Brand */}
          <div className="navbar-brand">
            <span className="navbar-icon">🎬</span>
            <span className="navbar-title">Movie Map</span>
          </div>
          
          {/* Navigation Links */}
          <div className="navbar-links">
            <a href="#" className="navbar-link">Log in</a>
            <a href="#" className="navbar-link">Search</a>
            <a href="#" className="navbar-link">Movies</a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="navbar-mobile-menu">
            <button className="navbar-mobile-button">
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