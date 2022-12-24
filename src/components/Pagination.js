import React from "react";

const Pagination = ({ postPerPage, totalPosts, setCurrentPage }) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }

  return (
    <div className='container mx-auto flex justify-center  text-center my-6 cursor-pointer'>
      {pages.map((page, index) => {
        return (
          <div className='container mx-auto' key={index}>
            <div
              onClick={() => setCurrentPage(page)}
              className='text-lg font-bold rounded-sm border'
            >
              {page}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Pagination;
