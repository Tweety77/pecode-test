import React from 'react';

interface PaginationProps {
  prev: string | null;
  next: string | null;
  pages: number;
  page: number;
  paginate: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ prev, next, pages, page, paginate }) => {
  return (
    <div className='flex justify-center my-4'>
      <button
        className={`px-4 py-2 mx-1 rounded ${!prev ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
        disabled={!prev}
        onClick={() => prev && paginate(page - 1)}
      >
        Prev
      </button>
      <span className='px-4 py-2 mx-1'>{page} / {pages}</span>
      <button
        className={`px-4 py-2 mx-1 rounded ${!next ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
        disabled={!next}
        onClick={() => next && paginate(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;