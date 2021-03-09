import React, { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { login, clearLogin } from "../../actions/index";
import Loader from "../Loader";
import { connect } from "react-redux";
import Alert from "../Alert";

const Login = ({ login, history, isLoading, user, error, clearLogin }) => {
  useEffect(() => {
    clearLogin();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    login({ username: e.target[0].value, password: e.target[1].value });
  };

  if (user) {
    console.log(user);
    let redirectTimeout = setTimeout(() => {
      history.push("/");
    }, 2000);
    return (
      <div className="Loading">
        <Alert
          AlertTitle={"Login Success"}
          AlertText={`Hello ${user.username}`}
          AlertType="success"
        />
      </div>
    );
  } else if (isLoading) {
    return (
      <div className="Loading">
        <Loader />
      </div>
    );
  } else if (error) {
    let redirectTimeout = setTimeout(() => {
      clearLogin();
      history.push("/login");
    }, 2000);
    return (
      <div className="Loading">
        <Alert AlertTitle={"Error"} AlertText={error} AlertType="failed" />
      </div>
    );
  } else
    return (
      <div className="login-container">
        <div className="login-form-background">
          <Form className="login-form" onSubmit={handleLogin}>
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

export default connect(mapStateToProps, { login, clearLogin })(Login);
