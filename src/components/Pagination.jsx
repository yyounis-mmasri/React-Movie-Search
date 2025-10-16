// src/components/Pagination.jsx
import React from 'react';
import '../styles/Pagination.css';

function DirectionButton({ label, targetPage, disabled, onGo, aria }) {
  const handleClick = () => {
    if (!disabled) onGo(targetPage);
  };
  return (
    <button
      className="pagination-btn"
      disabled={disabled}
      onClick={handleClick}
      aria-label={aria || label}
    >
      {label}
    </button>
  );
}

export default function Pagination({
  page,
  currentPage,
  totalPages = 1,
  onPageChange,
  showFirstLast = true,
}) {
  // normalize/clamp
  const toInt = (v, fb = 1) => {
    const n = Number(v);
    return Number.isFinite(n) && n > 0 ? Math.trunc(n) : fb;
  };
  const tp = toInt(totalPages, 1);
  const cur = Math.min(tp, Math.max(1, toInt(page ?? currentPage, 1)));

  const go = (p) => {
    const next = Math.min(tp, Math.max(1, toInt(p, cur)));
    if (next !== cur && typeof onPageChange === 'function') onPageChange(next);
  };

  return (
    <nav className="pagination" role="navigation" aria-label="Pagination">
      {showFirstLast && (
        <DirectionButton
          label="« First"
          targetPage={1}
          disabled={cur <= 1}
          onGo={go}
          aria="First page"
        />
      )}

      <DirectionButton
        label="← Previous"
        targetPage={cur - 1}
        disabled={cur <= 1}
        onGo={go}
        aria="Previous page"
      />

      <span className="pagination-info" aria-live="polite">
        Page {cur} of {tp}
      </span>

      <DirectionButton
        label="Next →"
        targetPage={cur + 1}
        disabled={cur >= tp}
        onGo={go}
        aria="Next page"
      />

      {showFirstLast && (
        <DirectionButton
          label="Last »"
          targetPage={tp}
          disabled={cur >= tp}
          onGo={go}
          aria="Last page"
        />
      )}
    </nav>
  );
}
