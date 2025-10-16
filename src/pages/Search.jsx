import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MovieGrid from '../components/MovieGrid';
import LoadingFallback from '../components/LoadingFallback';
import Pagination from '../components/Pagination';
import useSearchMovies from '../hooks/useeSearchMovies';
import { sanitizeQuery, clampPage, makeSetSafeParams, scrollToTopSmooth } from '../utils/searchHelpers';
import '../styles/Search.css';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawQ = searchParams.get('q') ?? '';
  const query = sanitizeQuery(rawQ);
  const currentPage = clampPage(searchParams.get('page') ?? 1);

  const [searchQuery, setSearchQuery] = useState(query);

  const { items, totalPages, loading, error } =
    useSearchMovies(query, currentPage, { debounceMs: 400 });

  const setSafeParams = makeSetSafeParams(setSearchParams);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) setSafeParams(searchQuery, 1);
  };

  const handlePageChange = (p) => {
    const next = clampPage(p, totalPages || 1);
    setSafeParams(query, next);
    scrollToTopSmooth();
  };

  return (
    <div className="search-page with-navbar">
      <Navbar />
      <div className="search-container">
        <div className="search-header">
          <h1>Search Movies</h1>
          <form onSubmit={handleSearch} className="search-form">
            <div className="search-input-wrapper">
              <label htmlFor="search-q" className="sr-only">Search by title</label>
              <input
                id="search-q"
                type="text"
                placeholder="Search for movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <button type="submit" className="search-button">🔍 Search</button>
            </div>
          </form>
        </div>

        {loading && <LoadingFallback />}

        {error && <div className="error-message"><p>Error: {error}</p></div>}

        {!loading && !error && query && (
          <>
            <div className="search-results-header">
              <h2>Search Results for "{query}"</h2>
            </div>
            {items.length === 0 ? (
              <div className="no-results"><p>No movies found for "{query}"</p></div>
            ) : (
              <>
                <MovieGrid items={items} />
                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </>
        )}

        {!query && !loading && (
          <div className="search-prompt"><p>Enter a movie title to search</p></div>
        )}
      </div>
    </div>
  );
}
