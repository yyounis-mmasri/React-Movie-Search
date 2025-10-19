import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'movie_search_history';
const MAX_HISTORY = 10;

export default function useSearchHistory() {
  const [history, setHistory] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setHistory(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error('Failed to load search history:', error);
      setHistory([]);
    }
  }, []);

  // Add a search term to history
  const addToHistory = useCallback((term) => {
    const trimmed = (term ?? '').trim();
    if (!trimmed) return;

    setHistory((prev) => {
      // Remove duplicates (case-insensitive)
      const filtered = prev.filter(
        (item) => item.toLowerCase() !== trimmed.toLowerCase()
      );
      
      const updated = [trimmed, ...filtered].slice(0, MAX_HISTORY);
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save search history:', error);
      }
      
      return updated;
    });
  }, []);

  const removeFromHistory = useCallback((term) => {
    setHistory((prev) => {
      const filtered = prev.filter((item) => item !== term);
      
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      } catch (error) {
        console.error('Failed to update search history:', error);
      }
      
      return filtered;
    });
  }, []);

  // Clear all history
  const clearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear search history:', error);
    }
  }, []);

  return {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
  };
}