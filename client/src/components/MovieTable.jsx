import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/Table";
import auth from "../services/authService";
import { Link } from "react-router-dom";

class MovieTable extends Component {
  columns = [
    { path: "title", label: "Title", content: (movie) => (
      <Link
        to={`/movies/${movie._id}`}
      >{movie.title}</Link>
    ), },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          onClick={() => this.props.handleLike(movie)}
        />
      )
    }
  ];

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        className="btn btn-danger btn-sm"
        onClick={() => this.props.handleDelete(movie)}
      >
        delete
      </button>
    )
  };

  constructor(){
    super();
    const user = auth.getCurrentUser();
    if(user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    const { movies, handleSort, sortColumn } = this.props;

    return (
      <Table
        data={movies}
        columns={this.columns}
        sortColumn={sortColumn}
        handleSort={handleSort}
      />
    );
  }
}

export default MovieTable;
