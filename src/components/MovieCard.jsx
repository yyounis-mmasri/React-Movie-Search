
import React from 'react';
import '../styles/MovieCard.css';

 const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <div className="movie-poster">
        {movie.poster_path ? (
          <img 
            src={movie.poster_path} 
            alt={movie.title}
            className="movie-poster-img"
          />
        ) : (
          <div className="movie-poster-placeholder">
            <span>🎬</span>
          </div>
        )}
        {movie.vote_average && (
          <div className="movie-rating">
            {movie.vote_average.toFixed(1)}
          </div>
        )}
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        {movie.release_date && (
          <p className="movie-year">
            {new Date(movie.release_date).getFullYear()}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;