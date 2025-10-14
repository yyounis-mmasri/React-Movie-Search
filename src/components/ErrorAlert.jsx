
import React from 'react';
import '../styles/ErrorAlert.css';

export default function ErrorAlert({ message, onRetry }) {
  return (
    <div className="error-alert">
      <div className="error-content">
        <h3>⚠️ Error</h3>
        <p>{message}</p>
        {onRetry && (
          <button onClick={onRetry} className="retry-btn">
            Retry
          </button>
        )}
      </div>
    </div>
  );
}