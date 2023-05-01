import React, { Component } from "react";
import _ from "lodash";
const Paginattion = ({ totalItems, pageSize, pageChange, currPage }) => {
  var pageCount = Math.ceil(totalItems / pageSize);
  if(pageCount === 1) return null;
  const pages = _.range(1, pageCount+1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((x) => {
          return (
            <li className={currPage === x ? "page-item active" : "page-item"} key={x}>
              <a className="page-link" style={{ cursor: "pointer" }} onClick={() => pageChange(x)}>
                {x}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Paginattion;
