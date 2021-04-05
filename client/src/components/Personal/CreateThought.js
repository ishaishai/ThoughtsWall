import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CreateThought = ({ auth, history, getThoughts }) => {
  const [collapsed, setCollapsed] = useState(true);
  const handleThought = async (e) => {
    e.preventDefault();
    const thoughtText = e.target[0].value;
    console.log(thoughtText);
    try {
      const response = await axios.post("/api/thoughts/create-thought", {
        thoughtText,
      });
      getThoughts();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <Card className="create-thought-container">
      {auth.user ? (
        <Form onSubmit={handleThought}>
          <Card.Body>
            <Card.Text>
              <Form.Control placeholder="Enter your thought here" />
            </Card.Text>
            {/* <Card.Subtitle className="mb-2 text-muted">owner</Card.Subtitle> */}
            <div className="thoughtTogglesBox">
              <Button
                className="toggleThoughtBtn"
                type="submit"
                variant="success"
              >
                SHARE
              </Button>
            </div>
          </Card.Body>
        </Form>
      ) : (
        <div className="create-thought-welcome">
          <div className="create-thought-welcome-msg">
            Sign in to start sharing.
          </div>
          <Button
            as={Link}
            to="/login"
            className="create-thought-welcome-button"
          >
            Sign-In
          </Button>
        </div>
      )}
    </Card>
  );
};
const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps, null)(CreateThought);
