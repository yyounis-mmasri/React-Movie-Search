const MovieGrid = () => {
  const movies = Array(9).fill({
    title: 'spider man',
    poster: 'ONE BATTLE AFTER ANOTHER'
  });

  return (
    <div className="movie-grid">
      {movies.map((movie, index) => (
        <div key={index} className="movie-card">
          <div className="movie-poster">
            <div className="movie-poster-text">
              <p>{movie.poster}</p>
            </div>
            <div className="movie-rating">8.5</div>
          </div>
          <div className="movie-info">
            <h3 className="movie-title">{movie.title}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};