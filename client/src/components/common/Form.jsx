import React, { Component } from "react";
import Input from "./Input";
import Select from "./Select";
import Joi from "joi";
class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];
    const data = this.state.data;
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.submitForm();
  };

  validate = () => {
    const schema = Joi.object(this.Schema);
    const { error } = schema.validate(this.state.data, {
      abortEarly: false,
    });
    if (!error) return null;
    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = Joi.object({ [name]: this.Schema[name] });
    const { error } = schema.validate(obj);
    return error ? error.details[0].message : null;
  };

  renderButton = (label) => {
    return (
      <button disabled={this.validate()} className="btn btn-primary mt-2">
        {label}
      </button>
    );
  };

  renderInput = (label, name, type = "text") => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        value={data[name]}
        label={label}
        type={type}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };

  renderSelect = (label, name, options) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  };
}

export default Form;
