import React from "react";
import "./css/MPagination.css";
import Pagination from "@material-ui/lab/Pagination";

const MPagination = ({ postsPerPage, totalPosts, paginate, page }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination__wrapper">
      <Pagination count={pageNumbers.length} page={page} onChange={paginate} />
    </div>
  );
};

export default MPagination;
