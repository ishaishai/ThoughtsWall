import Thought from "./Thought";
import Masonry from "react-masonry-css";
import "../../styles/Thoughts.css";

const breakpointColumnsObj = {
  default: 4,
  1000: 3,
  700: 2,
};

// const colors = ["#1BA39C", "#66CC99", "#36D7B7", "#C8F7C5"];
const colors = [
  "#1BA39C",
  "#66CC99",
  "#36D7B7",
  "#C8F7C5",
  "#86E2D5",
  "#89C4F4",
  "#2C3E50",
  "#4B77BE",
];

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
const ThoughtsContainer = ({ thoughts }) => {
  console.log(thoughts);
  return (
    <div id="Thoughts" style={{ height: "inherit", width: "100%" }}>
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
