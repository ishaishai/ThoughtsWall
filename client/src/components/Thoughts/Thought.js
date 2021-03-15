import { useState, useEffect } from "react";
import React from "react";
import { BiShow } from "react-icons/bi";
import CommentsModal from "../Comments/CommentsModal";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import "../../styles/Thoughts.css";
const Thought = ({ user, id, color, date, owner, text }) => {
  const [chosen, setChosen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [cardRef] = useState(React.createRef());
  const [backupHeight, setBackupHeight] = useState("");

  useEffect(() => {
    setBackupHeight(`${cardRef.current.offsetHeight}px`);
  }, []);

  useEffect(() => {
    console.log(backupHeight);
  }, [backupHeight]);

  const focusThought = () => {
    setChosen(!chosen);
  };

  return (
    <>
      <Card
        style={{
          display: `${chosen ? "block" : "none"}`,
          backgroundColor: "transparent",
          width: "10rem",
          height: `${backupHeight}`,
        }}
      ></Card>
      <Card ref={cardRef} className={`${chosen ? "hover-thought-card" : ""} `}>
        <Card.Body>
          <Card.Text>{text}</Card.Text>
          <Card.Subtitle className="mb-2 text-muted">
            Shared {date} by {owner}
          </Card.Subtitle>
          <div className="thoughtTogglesBox">
            {chosen && (
              <Button
                className="toggleCommentsBtn"
                variant="info"
                onClick={() => setShowComments(!showComments)}
              >
                COMMENTS
              </Button>
            )}
            <Button
              className="toggleThoughtBtn"
              variant={`${chosen ? "danger" : "info"}`}
              onClick={focusThought}
            >
              {`${chosen ? "CLOSE" : "VIEW"}`}
            </Button>
          </div>
        </Card.Body>
        {chosen && (
          <>
            {showComments && (
              <CommentsModal
                id={id}
                showComments={showComments}
                setShowComments={setShowComments}
              />
            )}
          </>
        )}
      </Card>
    </>
  );
};

const mapStateToProps = ({ auth }) => ({
  isLoading: auth.isLoading,
  user: auth.user,
  error: auth.error,
});

export default connect(mapStateToProps, null)(Thought);
