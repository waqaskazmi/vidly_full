import React, { Component } from "react";
const SearchBar = ({handleSearch, searchQuery}) => {
  return (
    <div className="form-outline mb-2 ">
      <input
        type="search"
        id="form1"
        className="form-control"
        placeholder="Search..."
        aria-label="Search"
        onChange={handleSearch}
        value={searchQuery} 
      />
    </div>
  );
};

export default SearchBar;
