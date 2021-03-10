import { Modal, Button } from "react-bootstrap";
import Comment from "./Comment";

const CommentsModal = ({ showComments, setShowComments }) => {
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
        <Comment />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="info">Add Comment</Button>
        <Button variant="danger" onClick={() => setShowComments(!showComments)}>
          Close
        </Button>
        {/* <Button variant="primary">Save Changes</Button> */}
      </Modal.Footer>
    </Modal>
  );
};

export default CommentsModal;
