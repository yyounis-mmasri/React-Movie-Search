import { useEffect, useRef, useState } from 'react';
import { searchMovies } from '../api/OMDb';

export default function useSearchMovies(query, page, { debounceMs = 400 } = {}) {
  const q = (query ?? '').trim();
  const p = Math.max(1, Number(page) || 1);

  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // simple debounce
  const [dq, setDq] = useState(q);
  const t = useRef(null);
  useEffect(() => {
    clearTimeout(t.current);
    t.current = setTimeout(() => setDq(q), debounceMs);
    return () => clearTimeout(t.current);
  }, [q, debounceMs]);

  useEffect(() => {
    if (!dq) { setItems([]); setTotalPages(1); setError(null); return; }

    let cancelled = false;
    (async () => {
      try {
        setLoading(true); setError(null);
        const res = await searchMovies(dq, p);
        if (!cancelled) {
          setItems(res.items);
          setTotalPages(res.totalPages);
          saveToHistory(dq);
        }
      } catch (e) {
        if (!cancelled) setError(e.message || 'Failed to fetch');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [dq, p]);

  return { items, totalPages, loading, error };
}

function saveToHistory(term) {
  const history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
  const updated = [term, ...history.filter(t => t !== term)].slice(0, 10);
  localStorage.setItem('searchHistory', JSON.stringify(updated));
}