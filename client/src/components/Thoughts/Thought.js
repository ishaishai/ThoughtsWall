import { useState } from "react";
import { BiShow } from "react-icons/bi";

const Thought = ({ color, owner, text }) => {
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
      <div className="thought-owner">thought by: {owner}</div>
      {chosen && (
        <button
          className="commentsShowbtn"
          onClick={() => setShowComments(!showComments)}
        >
          Show Comments
        </button>
      )}
    </div>
  );
};

export default Thought;
