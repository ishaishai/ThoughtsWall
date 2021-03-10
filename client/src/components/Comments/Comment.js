import { Toast } from "react-bootstrap";
import { IoPersonCircleSharp } from "react-icons/io5";
const Comment = () => {
  return (
    <Toast>
      <Toast.Header>
        <IoPersonCircleSharp alt="Go to profile" />
        <strong className="mr-auto">Author: </strong>
        <small>11 mins ago</small>
      </Toast.Header>
      <Toast.Body>
        Hey, the same thing happend to me, that's hilarious!
      </Toast.Body>
    </Toast>
  );
};

export default Comment;
