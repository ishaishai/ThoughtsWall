import React from "react";
import Loader from "./Loader";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, ...props }) => {
  console.log(isLoggedIn, props.component);
  if (isLoggedIn == null) {
    return <Loader />;
  }

  return isLoggedIn ? <Route {...props} /> : <Redirect to="/login" />;
};
export default ProtectedRoute;
