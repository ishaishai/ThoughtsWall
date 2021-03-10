import ThoughtsContainer from "./Thoughts/ThoughtsContainer";
import axios from "axios";
import { useState, useEffect } from "react";
import Thought from "./Thoughts/Thought";
import { thoughtsColors } from "./Thoughts/thoughtsColors";
import Masonry from "react-masonry-css";

let items = [
  { id: 1, name: "one" },
  { id: 2, name: "two" },
  { id: 3, name: "three" },
  { id: 4, name: "four" },
  { id: 5, name: "five" },
];

items = items.map(function (item) {
  return <div key={item.id}>{item.name}</div>;
});

const breakpointColumnsObj = {
  default: 4,
  768: 3,
  700: 2,
  500: 1,
};
const Home = () => {
  const [thoughts, setThoughts] = useState([]);
  useEffect(async () => {
    const response = await axios.get("/api/thoughts/get-all-thoughts");
    setThoughts(response.data);
  }, []);
  return (
    <div className="home" style={{ height: "100%" }}>
      {/* <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}> */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {thoughts.map((thought, i) => (
          <Thought
            color={thoughtsColors[i % thoughtsColors.length]}
            key={i}
            owner={thought.username ? thought.username.username : null}
            text={thought.thoughtText}
          />
        ))}
      </Masonry>
      {/* </ResponsiveMasonry> */}
      {/* <ThoughtsContainer thoughts={thoughts}></ThoughtsContainer> */}
    </div>
  );
};

export default Home;
