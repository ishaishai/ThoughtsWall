import ThoughtsContainer from "./Thoughts/ThoughtsContainer";
import axios from "axios";
import { useState, useEffect } from "react";
const Home = () => {
  const [thoughts, setThoughts] = useState([]);
  useEffect(async () => {
    const response = await axios.get("/api/thoughts/get-all-thoughts");
    setThoughts(response.data);
  }, []);
  return (
    <div className="home">
      <ThoughtsContainer thoughts={thoughts}></ThoughtsContainer>
    </div>
  );
};

export default Home;
