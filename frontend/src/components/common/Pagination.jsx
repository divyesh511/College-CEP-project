import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(i);
  }

  return (
    <nav className="d-flex justify-content-center my-4" aria-label="Page navigation">
      <ul className="pagination pagination-sm shadow-sm gap-1 mb-0">
        <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
          <button
            className="page-link rounded-pill px-3 d-flex align-items-center gap-1"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            <ChevronLeft size={16} />
            <span>Prev</span>
          </button>
        </li>

        {pages.map((p) => (
          <li key={p} className={`page-item ${p === currentPage ? 'active' : ''}`}>
            <button
              className={`page-link rounded-circle d-flex align-items-center justify-content-center mx-1 ${
                p === currentPage ? 'bg-info border-info text-dark fw-bold' : ''
              }`}
              style={{ width: '32px', height: '32px' }}
              onClick={() => onPageChange(p)}
            >
              {p + 1}
            </button>
          </li>
        ))}

        <li className={`page-item ${currentPage >= totalPages - 1 ? 'disabled' : ''}`}>
          <button
            className="page-link rounded-pill px-3 d-flex align-items-center gap-1"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
          >
            <span>Next</span>
            <ChevronRight size={16} />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
