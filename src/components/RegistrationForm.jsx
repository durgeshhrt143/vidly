import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
class RegistrationForm extends Form {
  state = {
    data: { email: "", password: "" },
    errors: {}
  };
  schema = {
    email: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .min(5)
      .label("Password")
  };
  doSubmit = async () => {
    try {
      await userService.registration(this.state.data);
    } catch (ex) {
      if (ex.respone && ex.respone.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.respone.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("email", "Username")}
        {this.renderInput("password", "Password", "password")}
        {this.renderButton("Registration")}
      </form>
    );
  }
}

export default RegistrationForm;
