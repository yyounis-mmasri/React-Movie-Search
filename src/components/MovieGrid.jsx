import React from 'react';
import MovieCard from './MovieCard';

import '../styles/MovieGrid.css';
export default function MovieGrid({ items, emptyMessage = 'No movies found', onSelect }) {
  if (items.length === 0) {
    return <div className="empty-state">{emptyMessage}</div>;
  }

  return (
    <div className="movie-grid">
      {items.map((movie) => (
        <MovieCard
          key={movie.id}
          id={movie.id}
          title={movie.title}
          year={movie.year}
          posterUrl={movie.posterUrl}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}