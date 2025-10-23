import { Link } from 'react-router-dom';
import { normalizeMovie, FALLBACK_POSTER } from '../utils/movieUtils';
import '../styles/MovieCard.css';

function MovieCard({ movie }) {
  if (!movie) return null;

  const { id, title, year, posterUrl, rating } = normalizeMovie(movie);
  if (!id) return null;

  return (
    <Link
      to={`/movie/${id}`}
      className="movie-card-link"
      aria-label={`View details for ${title}`}
    >
      <div className="movie-card">
        <div className="movie-poster-container">
          <img
            src={posterUrl}
            alt={`${title} poster`}
            className="movie-poster"
            loading="lazy"
            onError={(e) => {
              if (e.currentTarget.src !== FALLBACK_POSTER) {
                e.currentTarget.src = FALLBACK_POSTER; // prevent loop
              }
            }}
          />
          <div className="movie-overlay">
            {rating && (
              <div className="movie-rating">
                ⭐ {typeof rating === 'number' ? rating.toFixed(1) : rating}
              </div>
            )}
          </div>
        </div>
        <div className="movie-info">
          <h3 className="movie-title">{title}</h3>
          <p className="movie-year">{year}</p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;