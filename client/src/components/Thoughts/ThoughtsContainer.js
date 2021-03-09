import axios from "axios";
import Thought from "./Thought";
import { thoughtsColors } from "./thoughtsColors";
import { useState, useEffect } from "react";

const ThoughtsContainer = () => {
  const [thoughts, setThoughts] = useState([]);
  useEffect(async () => {
    const response = await axios.get("/api/thoughts/get-all-thoughts");
    setThoughts(response.data);
  }, []);
  return (
    <div className="thoughts-container">
      {thoughts.map((thought, i) => (
        <Thought
          color={thoughtsColors[i % thoughtsColors.length]}
          key={thought["_id"]}
          owner={thought.username.username}
          text={thought.thoughtText}
        />
      ))}
    </div>
  );
};

export default ThoughtsContainer;
