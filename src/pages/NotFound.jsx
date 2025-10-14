import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NnotFound.css';

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-text">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link to="/" className="not-found-button">
          🏠 Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;