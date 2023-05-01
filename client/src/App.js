import React, { Component } from "react";
import { Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import auth from "./services/authService";
import NavBar from "./components/NavBar";
import Movies from "./components/movies";
import Rentals from "./components/Rentals";
import Customers from "./components/Customers";
import NotFound from "./components/NotFound";
import MovieForm from "./components/MovieForm";
import LoginForm from "./components/LoginForm";
import Logout from "./components/Logout";
import RegisterForm from "./components/RegisterForm";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";



class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({user});
  }

  render(){
    return (
    <React.Fragment>
      <ToastContainer/>
      <NavBar user={this.state.user} />
      <main className="container">
        <Routes>
          
          <Route path="/login" element={<LoginForm />} />
          <Route path="/logout" element={<Logout/>} />
          <Route path="/register" element={<RegisterForm/>} />
          <Route path="/movies" element={<Movies user={this.state.user}/>} />
          {/* <Route path="/movies/:id" element={<MovieForm/>} /> */}
          <Route path="/movies/:id" element={<RequireAuth redirectTo="/login">
          <MovieForm/>
          </RequireAuth>} />
          <Route path="/rentals" element={<Rentals/>} />
          <Route path="/customers" element={<Customers/>} />
          <Route path="/" element={<Movies user={this.state.user}/>} />
          <Route path="/notfound" element={<NotFound/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </main>
    </React.Fragment>
  );

  function RequireAuth({ children, redirectTo }) {
    const user = auth.getCurrentUser();
    const location = useLocation();
    console.log(location);
    return user ? children : <Navigate to={redirectTo} state={{ from: location }} />;
  }

  }
  
}

export default App;
