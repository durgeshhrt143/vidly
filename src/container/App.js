import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Switch, Redirect } from "react-router-dom";
import Movies from "../container/movies";
import Rentals from "./../components/Rentals";
import Customers from "./../components/customers";
import MovieForm from "./../components/movieForm";
import PageNotFound from "./../components/pageNotFound";
import Navbar from "./../components/navbar";
import LoginForm from "./../components/LoginForm";
import Logout from "./../components/logout";
import RegistrationForm from "./../components/RegistrationForm";
import auth from "../services/authService";
import ProtectedRoute from "./../components/common/protecedRoute";
import AjaxDemo from "./ajax";
import Aux from "./../hoc/aux";
import "../assets/css/App.css";
import "react-toastify/dist/ReactToastify.css";
class App extends Component {
  state = {};
  componentDidMount() {
    let jwt = auth.getCurrentUser() === null ? "" : "durgesh";
    this.setState({ user: jwt });
  }
  render() {
    const { user } = this.state;
    console.log(user);
    return (
      <Aux>
        <Navbar user={user} />
        <ToastContainer />
        <main className="container">
          <Switch>
            <Route path="/registration" component={RegistrationForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={props => <Movies {...props} user={this.state.user} />}
            />
            <Route path="/rentals" component={Rentals} />
            <Route path="/customers" component={Customers} />
            <Route path="/ajax" component={AjaxDemo} />
            <Route path="/page-not-found" component={PageNotFound} />
            <Redirect from="/" to="/movies" exact />
            <Redirect to="/page-not-found" />
          </Switch>
        </main>
      </Aux>
    );
  }
}

export default App;
