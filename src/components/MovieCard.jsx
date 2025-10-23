import { Link } from 'react-router-dom';
import '../styles/MovieCard.css';

const FALLBACK_POSTER = '/placeholder-poster.png';

/**
 * Helper function to extract and normalize movie data
 * Handles multiple API formats (OMDb, TMDB, etc.)
 */ //
function extractMovieData(movie) {
  return {
    posterUrl: movie.posterUrl || 
               movie.Poster || 
               movie.poster_path || 
               FALLBACK_POSTER,
    
    year: movie.year || 
          movie.Year || 
          movie.release_date?.split('-')[0] || 
          'N/A',
    
    rating: movie.rating ?? 
            movie.imdbRating ?? 
            movie.vote_average ?? 
            null,
    
    id: movie.id || 
        movie.imdbID || 
        movie.imdb_id,
    
    title: movie.title || 
           movie.Title || 
           movie.name || 
           'Unknown Title'
  };
}

function MovieCard({ movie }) {
  if (!movie) return null;

  // Extract normalized data using helper
  const { posterUrl, year, rating, id, title } = extractMovieData(movie);

  // Don't render if no valid ID
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
                e.currentTarget.src = FALLBACK_POSTER;
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