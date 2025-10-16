import React from 'react';
import '../styles/Pagination.css';

export default function Pagination({
  page,
  currentPage,          
  totalPages = 1,
  onPageChange,
  showFirstLast = true,  
}) {

  const toInt = (v, fallback = 1) => {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? Math.trunc(n) : fallback;
  };

  const tp = toInt(totalPages, 1);
  const cur = Math.min(tp, Math.max(1, toInt(page ?? currentPage, 1)));

  const go = (p) => {
    const next = Math.min(tp, Math.max(1, toInt(p, cur)));
    if (next !== cur && typeof onPageChange === 'function') onPageChange(next);
  };

  return (
    <div className="pagination" role="navigation" aria-label="Pagination">
      {showFirstLast && (
        <button
          className="pagination-btn"
          onClick={() => go(1)}
          disabled={cur <= 1}
          aria-label="First page"
        >
          « First
        </button>
      )}

      <button
        className="pagination-btn"
        onClick={() => go(cur - 1)}
        disabled={cur <= 1}
        aria-label="Previous page"
      >
        ← Previous
      </button>

      <span className="pagination-info" aria-live="polite">
        Page {cur} of {tp}
      </span>

      <button
        className="pagination-btn"
        onClick={() => go(cur + 1)}
        disabled={cur >= tp}
        aria-label="Next page"
      >
        Next →
      </button>

      {showFirstLast && (
        <button
          className="pagination-btn"
          onClick={() => go(tp)}
          disabled={cur >= tp}
          aria-label="Last page"
        >
          Last »
        </button>
      )}
    </div>
  );
}