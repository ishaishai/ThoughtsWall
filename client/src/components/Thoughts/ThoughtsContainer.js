import Thought from "./Thought";
import { thoughtsColors } from "./thoughtsColors";

const ThoughtsContainer = ({ thoughts }) => {
  return (
    <div className="thoughts-container">
      {thoughts.map((thought, i) => (
        <Thought
          color={thoughtsColors[i % thoughtsColors.length]}
          key={thought["_id"] ? thought["_id"] : null}
          owner={thought.username ? thought.username.username : null}
          text={thought.thoughtText}
        />
      ))}
    </div>
  );
};

export default ThoughtsContainer;
