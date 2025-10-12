import React from 'react';
import MovieCard from './MovieCard'; 
import '../styles/MovieGrid.css';

export const MovieGrid = ({ movies = [] }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">🎬</span>
        <p>No movies found</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

