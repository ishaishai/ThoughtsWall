import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { Card } from "react-bootstrap";

const CreateThought = ({ history }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [alert, setAlert] = useState(false);

  const handleThought = async (e) => {
    e.preventDefault();
    const thoughtText = e.target[0].value;
    console.log(thoughtText);
    try {
      const response = await axios.post("/api/thoughts/create-thought", {
        thoughtText,
      });
      if (response.data.msg === "OK") {
        history.push("/");
      }
    } catch (error) {
      console.log(error.response.data.message.includes("date"));
      setAlert(true);
    }
  };

  return (
    <div className="create-thought-container">
      <Card>
        <Form onSubmit={handleThought}>
          <Card.Body>
            <Card.Text>
              <Form.Control placeholder="Enter your thought here" />
            </Card.Text>
            <Card.Subtitle className="mb-2 text-muted">owner</Card.Subtitle>
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
      {alert && (
        <Alert variant="danger">An error has occured please check!</Alert>
      )}
    </div>
  );
};

export default CreateThought;
