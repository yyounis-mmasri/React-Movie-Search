import { Link } from 'react-router-dom';
import '../styles/MovieCard.css';

function MovieCard({ movie }) {
  // Handle undefined movie
  if (!movie) return null;

  // Extract fields (supports OMDb format)
  const posterUrl = movie.posterUrl || 
                    movie.Poster || 
                    movie.poster_path || 
                    '/placeholder-poster.png';
  
  const year = movie.year || 
               movie.Year || 
               movie.release_date?.split('-')[0] || 
               'N/A';
  
  const rating = movie.rating || 
                 movie.imdbRating || 
                 movie.vote_average || 
                 null;
  
  const movieId = movie.id || 
                  movie.imdbID || 
                  movie.imdb_id;

  const title = movie.title || 
                movie.Title || 
                movie.name || 
                'Unknown Title';

  // If no valid ID, don't render
  if (!movieId) return null;

  return (
    <Link 
      to={`/movie/${movieId}`} 
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
              e.target.src = '/placeholder-poster.png';
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