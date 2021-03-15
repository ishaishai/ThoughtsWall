import Thought from "./Thought";
import Masonry from "react-masonry-css";
import "../../styles/Thoughts.css";

const breakpointColumnsObj = {
  default: 4,
  1000: 3,
  700: 2,
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
const ThoughtsContainer = ({ thoughts }) => {
  console.log(thoughts);
  return (
    <div style={{ height: "inherit", width: "100%" }}>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {thoughts.map((thought, i) => (
          <Thought
            key={i}
            id={thought["_id"]}
            date={thought.date}
            owner={
              thought.thoughtAuthor ? thought.thoughtAuthor.username : null
            }
            text={thought.thoughtText}
          />
        ))}
      </Masonry>
    </div>
  );
};

export default ThoughtsContainer;
