import React, { Component } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

const  Table = ({ data, columns, handleSort, sortColumn }) => {
    return (
      <table className="table">
        <TableHeader
          columns={columns}
          handleSort={handleSort}
          sortColumn={sortColumn}
        />
        <TableBody columns={columns} data={data} />
      </table>
    );
}

export default Table;
