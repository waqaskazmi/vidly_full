import React, { Component } from "react";
import { toast } from "react-toastify";
//import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getMovies, deleteMovie } from "../services/movieService";
import MovieTable from "./MovieTable";
import Pagination from "./common/pagination";
import paginate from "../utils/paginate";
import ListGroup from "./common/listgroup";
//import { getGenres } from "../services/fakeGenreService";
import { getGenres } from "../services/genreService";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import SearchBar from "./common/SearchBar";

function withNavigate(Component) {
  return (props) => <Component {...props} navigate={useNavigate()} />;
}

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currPage: 1,
    searchQuery: "",
    selectedGenre: "1",
    sortColumn: {
      path: "title",
      order: "asc",
    },
  };

  async componentDidMount() {
    const {data} = await getGenres();
    const {data : movies} = await getMovies();
    this.setState({ movies, genres: data });
  }

  getPagedData() {
    const { length: count } = this.state.movies;
    const filteredData =
      this.state.selectedGenre === "1" || this.state.selectedGenre === ""
        ? this.state.movies.filter((x) =>
            x.title.toLowerCase().includes(this.state.searchQuery.toLowerCase())
          )
        : this.state.movies.filter(
            (x) => x.genre._id === this.state.selectedGenre
          );
    const filteredCount = filteredData.length;

    const sortedData = _.orderBy(
      filteredData,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    const pagedData = paginate(
      sortedData,
      this.state.pageSize,
      this.state.currPage
    );
    return { pagedData, filteredCount };
  }

  render() {
    const { pagedData, filteredCount } = this.getPagedData();
    const { length: count } = this.state.movies;

    if (count === 0) <p>there are no movies in the database</p>;
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg-2">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              filter={this.handleFilter}
            />
          </div>
          <div className="col-lg-10">
            {this.props.user && <button
              className="btn btn-primary mb-3"
              onClick={() => this.props.navigate("/movies/new")}
            >
              New Movie
            </button>}
            <SearchBar
              searchQuery={this.state.searchQuery}
              handleSearch={this.handleSearch}
            />
            <p>Showing {filteredCount} movies in the database</p>
            <MovieTable
              movies={pagedData}
              handleLike={this.handleLike}
              handleDelete={this.handleDelete}
              handleSort={this.handleSort}
              sortColumn={this.state.sortColumn}
            />
            <Pagination
              totalItems={filteredCount}
              pageSize={this.state.pageSize}
              currPage={this.state.currPage}
              pageChange={this.handlePagechange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((x) => x._id !== movie._id);
    this.setState({ movies });
    try{
      await deleteMovie(movie._id);
    }
    catch(ex){
      if(ex.response && ex.response.status === 404)
      toast.error("Movie already deleted");
      this.setState({movies : originalMovies});
    }
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePagechange = (page) => {
    const newstate = {
      currPage: page,
    };
    this.setState(newstate);
  };

  handleFilter = (genre) => {
    const newstate = {
      selectedGenre: genre,
      currPage: 1,
      searchQuery: "",
    };
    this.setState(newstate);
    console.log(this.state);
  };

  handleSearch = ({ currentTarget: input }) => {
    const newstate = {
      selectedGenre: "",
      currPage: 1,
      searchQuery: input.value,
    };
    this.setState(newstate);
    console.log(this.state);
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
}

export default withNavigate(Movies);
