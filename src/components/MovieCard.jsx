import React from 'react';

import '../styles/MovieCard.css';
export default function MovieCard({ id, title, year, posterUrl, onClick }) {
  return (
    <div className="movie-card" onClick={() => onClick && onClick(id)}>
      <div className="poster-container">
        {posterUrl ? (
          <img src={posterUrl} alt={title} className="poster" />
        ) : (
          <div className="poster-placeholder">No Image</div>
        )}
      </div>
      <div className="card-info">
        <h3 className="movie-title">{title}</h3>
        {year && <p className="movie-year">{year}</p>}
      </div>
    </div>
  );
}