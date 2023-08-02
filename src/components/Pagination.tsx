import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePreviousClick = () => {
    onPageChange(currentPage - 1);
  };

  console.log(totalPages);
  const handleNextClick = () => {
    onPageChange(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const maxPagesToShow = 5;
  let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
  let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);
  console.log(startPage, endPage);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(endPage - maxPagesToShow + 1, 1);
  }

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => index + startPage
  );

  console.log({ pageNumbers, endPage, startPage, totalPages });

  return (
    <div className="flex justify-center my-4">
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
        onClick={handlePreviousClick}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {startPage > 1 && (
        <span key="start-ellipsis" className="font-bold py-2 px-4">
          ...
        </span>
      )}
      {pageNumbers.length > 0 &&
        pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`${
              pageNumber === currentPage
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            } hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded`}
            onClick={() => handlePageClick(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      {endPage < totalPages && (
        <span key="end-ellipsis" className="font-bold py-2 px-4">
          ...
        </span>
      )}
      <button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
        onClick={handleNextClick}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;



