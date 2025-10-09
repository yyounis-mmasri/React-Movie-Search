import React from 'react';
import '../styles/Loading.css';

const LoadingFallback = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  );
};

export default LoadingFallback;