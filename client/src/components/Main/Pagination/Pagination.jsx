import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange, limit, totalProducts }) => {
  if (limit >= totalProducts) return null; // No mostrar paginación si se muestran todos los productos

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
            <button onClick={() => onPageChange(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;