import React from "react";
import { Button, Form } from "react-bootstrap";
import { login } from "../../actions/index";
import Loader from "../Loader";
import { connect } from "react-redux";

const Login = ({ login, history, isLoading, user, error }) => {
  if (isLoading) {
    return (
      <div className="Loading">
        <Loader />
      </div>
    );
  }

  const handleLogin = (e) => {
    e.preventDefault();
    login();
  };
  return (
    <div className="login-container">
      <div className="login-form-background">
        <Form className="register-form" onSubmit={handleLogin}>
          <h1>Login</h1>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Username" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="dark" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  isLoading: auth.isLoading,
  user: auth.user,
  error: auth.error,
});

export default connect(mapStateToProps, { login })(Login);
