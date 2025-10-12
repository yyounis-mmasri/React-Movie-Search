import React from 'react';
import '../styles/Pagination.css';

export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="pagination-btn"
      >
        ← Previous
      </button>
      <span className="pagination-info">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className="pagination-btn"
      >
        Next →
      </button>
    </div>
  );
}