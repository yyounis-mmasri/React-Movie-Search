import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';                
import MovieGrid from '../components/MovieGrid';
import LoadingFallback from '../components/LoadingFallback';
import Pagination from '../components/Pagination';
import { searchMovies } from '../api/OMDb';
import '../styles/Search.css';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawQ = searchParams.get('q') ?? '';
  const query = rawQ.replace(/^=+/, '').trim();           
  const currentPage = Math.max(
    1,
    Number.parseInt(searchParams.get('page') ?? '1', 10) || 1
  );

  const [searchQuery, setSearchQuery] = useState(query);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  // helper to set params safely
  const setSafeParams = (q, p = 1) => {
    const cleanQ = (q ?? '').replace(/^=+/, '').trim();
    const cleanP = Math.max(1, Number(p) || 1);
    setSearchParams({ q: cleanQ, page: String(cleanP) });
  };

  // effect: fetch on q/page change
  useEffect(() => {
    if (!query) {
      setItems([]);
      setTotalPages(1);
      setError(null);
      return;
    }

    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await searchMovies(query, currentPage);
        if (!cancelled) {
          setItems(res.items);
          setTotalPages(res.totalPages);
          saveToHistory(query);
        }
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to fetch');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [query, currentPage]);

  // search history
  const saveToHistory = (term) => {
    const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    const updated = [term, ...history.filter(t => t !== term)].slice(0, 10);
    localStorage.setItem('searchHistory', JSON.stringify(updated));
  };
  const searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');

  // handlers
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) setSafeParams(searchQuery, 1);
  };

  const handleHistoryClick = (term) => setSafeParams(term, 1);

  const clearHistory = () => {
    localStorage.removeItem('searchHistory');
    if (!query) setSearchQuery('');
  };

  const handlePageChange = (p) => {
    const next = Math.min(Math.max(1, Number(p) || 1), totalPages || 1);
    setSafeParams(query, next);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

        {searchHistory.length > 0 && !query && (
          <div className="search-history">
            <div className="history-header">
              <h3>Recent Searches</h3>
              <button onClick={clearHistory} className="clear-history">Clear History</button>
            </div>
            <div className="history-items">
              {searchHistory.map((term, i) => (
                <button key={i} onClick={() => handleHistoryClick(term)} className="history-item">
                  🕐 {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && <LoadingFallback />}

        {error && (
          <div className="error-message">
            <p>Error: {error}</p>
          </div>
        )}

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
                <p>Try searching with different keywords</p>
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

        {!query && !loading && (
          <div className="search-prompt">
            <p>Enter a movie title to search</p>
          </div>
        )}
      </div>
    </div>
  );
}
