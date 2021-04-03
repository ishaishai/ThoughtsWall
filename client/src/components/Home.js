import ThoughtsContainer from "./Thoughts/ThoughtsContainer";
import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Thought from "../components/Thoughts/Thought";
import Particles from "react-particles-js";
import "../styles/App.css";
import Welcome from "./Welcome";

const Home = ({ user }) => {
  const [thoughts, setThoughts] = useState([]);
  useEffect(async () => {
    const response = await axios.get("/api/thoughts/get-all-thoughts");
    setThoughts(response.data);
  }, []);

  return (
    <div className="home">
      {/* <Particles
        style={{ position: "absolute" }}
        height="100%"
        width="100%"
        params={{
          particles: {
            color: {
              value: "#000000",
            },
            line_linked: {
              color: {
                value: "#000000",
              },
            },
            number: {
              value: 100,
            },
            size: {
              value: 1,
            },
          },
        }}
      /> */}

      <Welcome />
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
