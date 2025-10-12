import React, { useState, useEffect } from 'react';
import {
  Spinner,
  ErrorAlert,
  MovieGrid,
  Pagination,
  Navbar,
} from '../components';
import { getTrending } from '../api/OMDb';
import '../styles/Home.css';

export default function Home() {
  const [status, setStatus] = useState('idle');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      setStatus('loading');
      setErrorMsg(null);

      try {
        const data = await getTrending(page, 24);
        setMovies(data.items);
        setTotalPages(data.totalPages);
        setStatus('idle');
      } catch (error) {
        console.error('Error fetching movies:', error);
        setErrorMsg('Failed to load movies. Please try again.');
        setStatus('error');
      }
    };

    fetchTrending();
  }, [page]);

  const handleRetry = () => {
    setPage(1);
  };

  const handleMovieSelect = (movieId) => {
    console.log('Selected movie:', movieId);
    // TODO: Navigate to movie details page
    // navigate(`/movie/${movieId}`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app">
      <Navbar />

      <div className="home-container">
        <div className="home-header">
          <h1>Trending Now</h1>
          <p className="subtitle">
            Discover the hottest movies this season
          </p>
        </div>

        <div className="home-content">
          {status === 'loading' && (
            <Spinner label="Loading trending movies…" />
          )}

          {status === 'error' && (
            <ErrorAlert message={errorMsg} onRetry={handleRetry} />
          )}

          {status === 'idle' && (
            <>
              <MovieGrid
                items={movies}
                emptyMessage="No movies found"
                onSelect={handleMovieSelect}
              />

              {totalPages > 1 && (
                <Pagination
                  page={page}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}