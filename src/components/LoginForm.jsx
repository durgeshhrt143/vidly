import React from "react";
import Aux from "../hoc/aux";
import Joi from "joi-browser";
import Form from "./common/form";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";
class LoginForm extends Form {
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
      .label("Password")
  };

  doSubmit = async () => {
    //call server

    try {
      const { data } = this.state;
      await auth.login(data.email, data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        const errors = { ...this.state.errors };
        errors.email = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <Aux>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Username")}
          {this.renderInput("password", "Password")}
          {this.renderButton("login")}
        </form>
      </Aux>
    );
  }
}

export default LoginForm;
