import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MovieGrid from '../components/MovieGrid';
import LoadingFallback from '../components/LoadingFallback';
import Pagination from '../components/Pagination';
import useSearchMovies from '../hooks/useSearchMov';
import useSearchHistory from '../hooks/useSearchHist';
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

  const { history, addToHistory, removeFromHistory, clearHistory } = useSearchHistory();

  const setSafeParams = makeSetSafeParams(setSearchParams);

  useEffect(() => {
    if (query && items.length > 0 && !loading) {
      addToHistory(query);
    }
  }, [query, items.length, loading, addToHistory]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSafeParams(searchQuery, 1);
    }
  };

  const handleHistoryClick = (term) => {
    setSearchQuery(term);
    setSafeParams(term, 1);
  };

  const handleRemoveHistoryItem = (term, e) => {
    e.stopPropagation(); 
    removeFromHistory(term);
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
                autoComplete="off"
              />
              <button type="submit" className="search-button">🔍 Search</button>
            </div>
          </form>
        </div>

        {!query && !loading && history.length > 0 && (
          <div className="search-history">
            <div className="history-header">
              <h3>Recent Searches</h3>
              <button onClick={clearHistory} className="clear-history-btn">
                Clear All
              </button>
            </div>
            <div className="history-items">
              {history.map((term, index) => (
                <div
                  key={index}
                  className="history-item"
                  onClick={() => handleHistoryClick(term)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleHistoryClick(term);
                  }}
                >
                  <span className="history-icon">🕐</span>
                  <span className="history-text">{term}</span>
                  <button
                    className="history-remove"
                    onClick={(e) => handleRemoveHistoryItem(term, e)}
                    aria-label={`Remove ${term} from history`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {loading && <LoadingFallback />}

        {error && <div className="error-message"><p>Error: {error}</p></div>}

        {!loading && !error && query && (
          <>
            <div className="search-results-header">
              <h2>
                Search Results for "{query}"
                {items.length > 0 && (
                  <span className="results-count"> ({items.length} results)</span>
                )}
              </h2>
            </div>
            {items.length === 0 ? (
              <div className="no-results">
                <p>No movies found for "{query}"</p>
                <p>Try different keywords or check spelling</p>
              </div>
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

        {!query && !loading && history.length === 0 && (
          <div className="search-prompt">
            <div className="prompt-icon">🎬</div>
            <p>Enter a movie title to search</p>
          </div>
        )}
      </div>
    </div>
  );
}