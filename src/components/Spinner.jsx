import React from 'react';
import '../styles/Spinner.css';

export default function Spinner({ label = 'Loading…' }) {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>{label}</p>
    </div>
  );
}