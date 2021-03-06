import NavBar from "./NavBar";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import MyThoughts from "./Personal/MyThoughts";
import Home from "./Home";
import { fetchUser } from "../actions/index";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/App.css";
import ProtectedRoute from "./ProtectedRoute";
import { Nav } from "react-bootstrap";
import Profile from "./Personal/Profile";

const App = ({ fetchUser, auth }) => {
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />

          <ProtectedRoute
            isLoggedIn={auth.user}
            path="/my-thoughts"
            exact
            component={MyThoughts}
          />
          <ProtectedRoute
            isLoggedIn={auth.user}
            path="/profile"
            exact
            component={Profile}
          />
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps, { fetchUser })(App);
