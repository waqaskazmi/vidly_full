import React, { Component } from "react";
import Form from "./common/Form";
import Joi from "joi";
import {registerUser} from "../services/userService";
import auth from "../services/authService"
import { useParams, useNavigate } from "react-router-dom";

function withParamsNavigate(Component) {
  return (props) => (
    <Component {...props} params={useParams()} navigate={useNavigate()} />
  );
}

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  Schema = {
    username: Joi.string().required().label("Username").email({ tlds: { allow: false } }) ,
    password: Joi.string().required().min(5).label("Password") ,
    name: Joi.string().required().label("Name")
  };

  submitForm = async () => {
    try{
      const response = await registerUser(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      //this.props.navigate("/");
      window.location = "/";
    }
    catch(ex){
      if (ex.response && ex.response.status===404){
        const errors = {...this.state.errors};
        errors.username = ex.response.data;
        return this.setState({errors })
      }
      
    }
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
        {this.renderInput("Username", "username", "email")}
        {this.renderInput("Password", "password", "password")}
        {this.renderInput("Name", "name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default withParamsNavigate(RegisterForm);