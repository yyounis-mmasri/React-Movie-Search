import { useState } from 'react';
import { Link } from 'react-router-dom';
import { normalizeMovie, FALLBACK_POSTER } from '../utils/movieUtils';
import PlaceholderPoster from './PlaceholderPoster';
import '../styles/MovieCard.css';

function MovieCard({ movie }) {
  if (!movie) return null;

  const { id, title, year, posterUrl, rating } = normalizeMovie(movie);

  // Track if image failed to load
  const [imageError, setImageError] = useState(false);

  // Valid poster?
  const hasPoster =
    posterUrl &&
    posterUrl !== FALLBACK_POSTER &&
    posterUrl !== 'N/A' &&
    !imageError;

  if (!id) return null;

  return (
    <Link
      to={`/movie/${id}`}
      className="movie-card-link"
      aria-label={`View details for ${title}`}
    >
      <div className="movie-card">
        {/* Poster area */}
        <div className="movie-poster-container" aria-hidden="true">
          {hasPoster ? (
            <img
              src={posterUrl}
              alt={`${title} poster`}
              className="movie-poster"
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <PlaceholderPoster title={title} year={year} />
          )}

          <div className="movie-overlay">
            {rating && (
              <div className="movie-rating">
                ⭐ {typeof rating === 'number' ? rating.toFixed(1) : rating}
              </div>
            )}
          </div>
        </div>

        {/* Text area */}
        <div className="movie-info">
          <h3 className="movie-title">{title}</h3>
          <p className="movie-year">{year}</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;