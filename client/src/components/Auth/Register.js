import React, { useState } from "react";
import { register } from "../../actions/index";

import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    let user = { username: e.target[0].value, password: e.target[1].value };
    console.log(user);
    register(user);
  };

  return (
    <div className="register-container">
      <div className="register-form-background">
        <Form className="register-form" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username:</Form.Label>
            <Form.Control type="text" placeholder="Enter Username" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
