import { useEffect } from "react";
import { Toast } from "react-bootstrap";
import { IoPersonCircleSharp } from "react-icons/io5";
import { connect } from "react-redux";

const Message = ({ LoggedUser, author, text, date }) => {
  console.log(author, text, date);
  return (
    <Toast
      show={true}
      className={`${author === LoggedUser ? "message-left" : "message-right"}`}
    >
      <Toast.Header className="message-header">
        <IoPersonCircleSharp alt="Go to profile" />
        <strong className="mr-auto">
          From {author === LoggedUser ? "Me" : author}
        </strong>
        <small>{date}</small>
      </Toast.Header>
      <Toast.Body>{text}</Toast.Body>
    </Toast>
  );
};

export default Message;
