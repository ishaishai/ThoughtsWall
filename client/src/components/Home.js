import ThoughtsContainer from "./Thoughts/ThoughtsContainer";
import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Thought from "../components/Thoughts/Thought";

const Home = ({ user }) => {
  const [thoughts, setThoughts] = useState([]);
  useEffect(async () => {
    const response = await axios.get("/api/thoughts/get-all-thoughts");
    setThoughts(response.data);
  }, []);

  return (
    <div className="home" style={{ height: "100%" }}>
      {console.log(user)}
      <ThoughtsContainer thoughts={thoughts} />
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  isLoading: auth.isLoading,
  user: auth.user,
  error: auth.error,
});

export default connect(mapStateToProps, null)(Home);
