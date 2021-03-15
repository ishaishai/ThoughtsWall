import { Modal, Button, FormControl, Form } from "react-bootstrap";
import Comment from "./Comment";
import { useState, useEffect } from "react";
import Loader from "../Loader";
import axios from "axios";

const CommentsModal = ({ id, showComments, setShowComments }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
  console.log(id);
  const addComment = async (e) => {
    e.preventDefault();
    const comment = { thoughtId: id, commentText: e.target[0].value };
    try {
      const response = await axios.post(
        "/api/comments/addCommentToThought",
        comment
      );
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    }
    e.target[0].value = "";
    getComments();
  };

  const getComments = async () => {
    const response = await axios.get("/api/comments/getThoughtComments", {
      params: { id },
    });
    if (response.data) {
      setIsLoading(false);
      setComments(response.data);
    }
  };
  useEffect(async () => {
    getComments();
    console.log(showComments);
  }, []);
  return (
    <Modal
      className="comments-modal"
      show={showComments}
      onHide={() => setShowComments(!showComments)}
    >
      {/* //show={show} onHide={handleClose}> */}
      <Modal.Header closeButton>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <Loader />
        ) : (
          comments
            .map((comment, i) => (
              <Comment
                author={comment.author}
                text={comment.commentText}
                date={comment.date}
              />
            ))
            .reverse()
        )}
      </Modal.Body>

      <Modal.Footer>
        <Form onSubmit={addComment}>
          <FormControl placeholder="Comment" />

          <Button
            variant="danger"
            onClick={() => setShowComments(!showComments)}
          >
            Close
          </Button>
          <Button variant="info" type="submit">
            Add Comment
          </Button>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentsModal;
