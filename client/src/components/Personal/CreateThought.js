import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";

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
      <div className="create-thought-form-container">
        <Form className="create-thought-form" onSubmit={handleThought}>
          <h1>Create Your Own Thought</h1>
          <Form.Group>
            <Form.Label>Thought:</Form.Label>
            <Form.Control type="text" placeholder="ThoughtText" />
          </Form.Group>
          <Button variant="dark" type="submit">
            Submit
          </Button>
        </Form>
      </div>
      {alert && (
        <Alert variant="danger">An error has occured please check!</Alert>
      )}
    </div>
  );
};

export default CreateThought;
