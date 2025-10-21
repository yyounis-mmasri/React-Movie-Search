import MovieCard from './MovieCard';
import '../styles/MovieGrid.css';

function MovieGrid({ items = [], emptyMessage = 'No movies to display' }) {
  // Filter out any invalid movies
  const validItems = items.filter(movie => {
    if (!movie) return false;
    const hasId = movie.id || movie.imdbID;
    const hasTitle = movie.title || movie.Title;
    return hasId && hasTitle;
  });

  if (validItems.length === 0) {
    return (
      <div className="movie-grid-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {validItems.map((movie) => {
        const movieId = movie.id || movie.imdbID;
        return <MovieCard key={movieId} movie={movie} />;
      })}
    </div>
  );
}

export default MovieGrid;