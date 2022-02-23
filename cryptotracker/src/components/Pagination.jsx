import React from "react";

const Pagination = ({ currentPageHandler, pageCollection, currentPage }) => {
  return (
    <div className="w-[90%] md:w-[40%] m-auto text-white mt-8 mb-8 text-center">
      {pageCollection.map((page, key) => {
        return currentPage === page ? (
          <button
            className="border border-white px-2 bg-red-600"
            onClick={() => currentPageHandler(page)}
            key={key}
          >
            {page}
          </button>
        ) : (
          <button
            className="border border-white px-2"
            onClick={() => currentPageHandler(page)}
            key={key}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
