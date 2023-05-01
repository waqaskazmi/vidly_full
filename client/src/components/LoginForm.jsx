import React, { Component } from "react";
import Form from "./common/Form";
import Joi from "joi";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import auth from "../services/authService";

function withParamsNavigate(Component) {
  return (props) => (
    <Component {...props} params={useParams()} navigate={useNavigate()} location={useLocation()} />
  );
}

class LoginForm extends Form {

  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  Schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.number().required().label("Password"),
  };

  submitForm = async () => {
    try{
      const {data} = this.state;
      await auth.login(data.username, data.password);
      //this.props.navigate("/");
      //window.location = "/";
      const {state} = this.props.location;
      state ? window.location = state.from.pathname : window.location = "/";
    }
    catch(ex){
      if (ex.response && ex.response.status===400){
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
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
        {this.renderInput("Username", "username")}
        {this.renderInput("Password", "password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default withParamsNavigate(LoginForm);
