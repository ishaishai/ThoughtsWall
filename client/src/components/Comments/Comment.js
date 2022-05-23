import React,{ useEffect } from "react";
import { Toast } from "react-bootstrap";
import { IoPersonCircleSharp } from "react-icons/io5";
import { connect } from "react-redux";

const Comment = ({ auth, id, author, text, date, deleteComment }) => {
  useEffect(() => {
    console.log("ASD");
    console.log(auth.user.username, author);
    if (auth.user.username !== author) {
      let comment = (document.getElementById(id).lastChild.style.display =
        "none");
      console.log(comment);
    } else {
      let comment = (document.getElementById(id).lastChild.style.display =
        "block");
    }
  }, []);

  return (
    <Toast show={true} onClose={() => deleteComment(id)}>
      <Toast.Header id={id}>
        <IoPersonCircleSharp alt="Go to profile" />
        <strong className="mr-auto">Author: {author}</strong>
        <small>{date}</small>
      </Toast.Header>
      <Toast.Body>{text}</Toast.Body>
    </Toast>
  );
};

const mapStateToProps = ({ auth }) => ({ auth });
export default connect(mapStateToProps, null)(Comment);
