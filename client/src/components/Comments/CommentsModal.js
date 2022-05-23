import { Modal, Button, FormControl, Form } from "react-bootstrap";
import Comment from "./Comment";
import React,{ useState, useEffect } from "react";
import { connect } from "react-redux";
import Loader from "../Loader";
import axios from "axios";

const CommentsModal = ({ auth, id, showComments, setShowComments }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [comments, setComments] = useState([]);
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
    setIsLoading(true);
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
  }, []);

  const deleteComment = async (id) => {
    setIsLoading(true);
    try {
      const response = await axios.delete("/api/comments/deleteComment/" + id);
      setComments((prev) => prev.filter((item) => item.id !== id));
      setIsLoading(false);
    } catch (error) {
      alert("Error on delete");
    }
  };
  useEffect(() => {
    console.log(comments);
  }, [comments]);
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
        ) : comments.length > 0 ? (
          comments
            .map((comment, i) => (
              <Comment
                id={comment.id}
                author={comment.author}
                text={comment.commentText}
                date={comment.date}
                deleteComment={deleteComment}
              />
            ))
            .reverse()
        ) : (
          "No comments to show"
        )}
      </Modal.Body>

      {auth.user ? (
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
      ) : null}
    </Modal>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps, null)(CommentsModal);
