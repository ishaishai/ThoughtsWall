import { useState } from "react";
import { BiShow } from "react-icons/bi";
import CommentsModal from "../Comments/CommentsModal";

const Thought_ = ({ color, owner, text }) => {
  return (
    <div className={`thought-box`} style={{ backgroundColor: color }}>
      <div className="thought-text"> {text}</div>
    </div>
  );
};

export default Thought_;
