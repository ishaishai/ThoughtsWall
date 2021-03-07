import React from "react";
import { connect } from "react-redux";
import { register } from "../../actions/index";
import { Form, Button } from "react-bootstrap";
import Loader from "../Loader";

const Register = ({ register, isLoading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    let user = {
      email: e.target[0].value,
      username: e.target[1].value,
      password: e.target[2].value,
    };
    console.log(user);
    register(user);
  };

  if (isLoading) {
    return (
      <div className="Loading">
        <Loader />
      </div>
    );
  }
  return (
    <div className="register-container">
      <div className="register-form-background">
        <Form className="register-form" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>
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

const mapStateToProps = ({ user }) => ({
  isLoading: user.isLoading,
  error: user.error,
});

export default connect(mapStateToProps, { register })(Register);

//export default Register;
