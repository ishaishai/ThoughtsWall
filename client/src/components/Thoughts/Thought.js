import { useState } from "react";

const Thought = ({ color, owner, text }) => {
  const [chosen, setChosen] = useState(false);
  return (
    <div
      className={`thought-box ${chosen ? "hover-thought-box" : ""}`}
      onClick={() => setChosen(!chosen)}
      style={{ backgroundColor: color }}
    >
      <div className="thought-text"> {text}</div>
      <div className="thought-owner">thought by: {owner}</div>
    </div>
  );
};

export default Thought;
