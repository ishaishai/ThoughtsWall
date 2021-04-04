import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { connect } from "react-redux";
import { useState } from "react";
import { Card } from "react-bootstrap";

const CreateThought = ({ auth, history, getThoughts }) => {
  const [collapsed, setCollapsed] = useState(true);
  const handleThought = async (e) => {
    e.preventDefault();
    const thoughtText = e.target[0].value;
    console.log(thoughtText);
    try {
      if (auth.user === null) {
        return;
      }
      const response = await axios.post("/api/thoughts/create-thought", {
        thoughtText,
      });
      getThoughts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card className="create-thought-container">
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
    </Card>
  );
};
const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps, null)(CreateThought);
