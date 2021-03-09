import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";

const CreateThought = () => {
  const handleThought = async (e) => {
    e.preventDefault();
    const thoughtText = e.target[0].value;
    console.log(thoughtText);
    const response = await axios.post("/api/thoughts/create-thought", {
      thoughtText,
    });
  };

  return (
    <div>
      <Form className="" onSubmit={handleThought}>
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
  );
};

export default CreateThought;
