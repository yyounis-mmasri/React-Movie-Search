// src/hooks/useSearchMovies.js
import { useEffect, useRef, useState } from 'react';
import { searchMovies } from '../api/OMDb';

export default function useSearchMovies(
  query,
  page,
  { debounceMs = 400 } = {}
) {
  const sanitizedQuery = (query ?? '').trim();
  const pageNumber = Math.max(1, Number(page) || 1);

  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // debounce query
  const [debouncedQuery, setDebouncedQuery] = useState(sanitizedQuery);
  const debounceTimerRef = useRef(null);
  useEffect(() => {
    clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(
      () => setDebouncedQuery(sanitizedQuery),
      debounceMs
    );
    return () => clearTimeout(debounceTimerRef.current);
  }, [sanitizedQuery, debounceMs]);

  useEffect(() => {
    if (!debouncedQuery) {
      setItems([]); setTotalPages(1); setError(null);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        setLoading(true); setError(null);
        const res = await searchMovies(debouncedQuery, pageNumber);
        if (!cancelled) {
          setItems(res.items);
          setTotalPages(res.totalPages);
        }
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to fetch');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [debouncedQuery, pageNumber]);

  return { items, totalPages, loading, error };
}
