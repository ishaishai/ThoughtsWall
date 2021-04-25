import Thought from "./Thought";
import Masonry from "react-masonry-css";
import "../../styles/Thoughts.css";
import CreateThought from "../Personal/CreateThought";
import ThinkingMan from "../../assets/thinking-man.svg";

const breakpointColumnsObj = {
  default: 4,
  1000: 2,
  700: 2,
};

const colors = ["#309975", "#58b368", "#58b368", "#efeeb4"];
const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
const ThoughtsContainer = ({
  toggleThoughtCreate = true,
  thoughts,
  getThoughts,
}) => {
  return (
    <div id="Thoughts" style={{ height: "inherit", width: "100%" }}>
      {toggleThoughtCreate ? (
        <div className="create-thought-main-container">
          <img className="thinking-man-img" src={ThinkingMan} />
          <CreateThought getThoughts={getThoughts} />
        </div>
      ) : null}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {thoughts
          .map((thought, i) => (
            <Thought
              color={colors[i % colors.length]}
              key={i}
              id={thought["_id"]}
              date={thought.date}
              owner={
                thought.thoughtAuthor ? thought.thoughtAuthor.username : null
              }
              text={thought.thoughtText}
            />
          ))
          .reverse()}
      </Masonry>
    </div>
  );
};

export default ThoughtsContainer;
