import React from "react";

export const Pagination = React.memo(({ total, page, onPageChange }) => {
  return (
      <div className="pagination">
          <button
              className='btn btn-text'
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
          >
              Anterior
          </button>
          <span> página {page} de {total !== 0 ? total : 1} </span>
          <button
              className='btn btn-text'
              disabled={(page === total) || total === 0}
              onClick={() => onPageChange(page + 1)}
          >
              Próximo
          </button>
      </div>
  )
}, (prevProps, nextProps) => {
  return prevProps.total === nextProps.total && prevProps.page === nextProps.page;
});