import { useState } from "react";
import { BiShow } from "react-icons/bi";
import CommentsModal from "../Comments/CommentsModal";
import { Button } from "react-bootstrap";

const Thought = ({ id, color, date, owner, text }) => {
  const [chosen, setChosen] = useState(false);
  const [showComments, setShowComments] = useState(false);

  return (
    <div
      className={`thought-box ${chosen ? "hover-thought-box" : ""}`}
      style={{ backgroundColor: color }}
    >
      <BiShow
        className="thought-pick-icon"
        onClick={() => setChosen(!chosen)}
      />
      <div className="thought-text"> {text}</div>
      <div className="thought-date">{date}</div>
      {owner && <div className="thought-owner">by {owner}</div>}
      {chosen && (
        <>
          <Button
            className="commentsShowbtn"
            variant="light"
            onClick={() => setShowComments(!showComments)}
          >
            Show Comments
          </Button>
          {showComments && (
            <CommentsModal
              id={id}
              showComments={showComments}
              setShowComments={setShowComments}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Thought;
