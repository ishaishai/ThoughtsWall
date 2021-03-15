import React, { useEffect } from "react";
import { connect } from "react-redux";
import { register, clearRegister } from "../../actions/index";
import { Form, Button } from "react-bootstrap";
import Loader from "../Loader";
import Alert from "../Alert";
import "../../styles/Auth.css";

const Register = ({
  history,
  register,
  clearRegister,
  isLoading,
  errors,
  success,
}) => {
  useEffect(() => {
    console.log("clearing register");
    clearRegister();
  }, []);

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
  } else if (errors) {
    return (
      <div className="Loading">
        <Alert AlertTitle={"Error"} AlertText={errors} AlertType="failed" />
      </div>
    );
  } else if (success) {
    let redirectTimeout = setTimeout(() => {
      history.push("/login");
    }, 5000);
    return (
      <div className="Loading">
        <Alert
          AlertTitle={"Registeration Completed"}
          AlertText={"Redirecting to Login page"}
          AlertType="success"
        />
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
  errors: user.errors,
  success: user.success,
});

export default connect(mapStateToProps, { register, clearRegister })(Register);

//export default Register;
