import React from 'react';
import '../styles/Pagination.css'; 

export default function DirectionButton({ label, targetPage, disabled, onGo, aria }) {
  const handleClick = () => {
    if (!disabled && typeof onGo === 'function') onGo(targetPage);
  };
  return (
    <button
      className="pagination-btn"
      disabled={disabled}
      onClick={handleClick}
      aria-label={aria || label}
    >
      {label}
    </button>
  );
}