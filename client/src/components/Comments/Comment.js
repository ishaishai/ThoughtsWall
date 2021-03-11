import { Toast } from "react-bootstrap";
import { IoPersonCircleSharp } from "react-icons/io5";
const Comment = ({ author, text, date }) => {
  return (
    <Toast>
      <Toast.Header>
        <IoPersonCircleSharp alt="Go to profile" />
        <strong className="mr-auto">Author: {author}</strong>
        <small>{date}</small>
      </Toast.Header>
      <Toast.Body>{text}</Toast.Body>
    </Toast>
  );
};

export default Comment;
