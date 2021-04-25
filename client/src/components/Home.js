import ThoughtsContainer from "./Thoughts/ThoughtsContainer";
import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../styles/App.css";
import Welcome from "./Welcome";
import Loader from "./Loader";
import { getThoughts } from "../actions/index";

const Home = ({ user, isLoading, thoughts, getThoughts }) => {
  useEffect(() => {
    getThoughts();
  }, []);

  return (
    <div className="home">
      <Welcome />
      {isLoading ? (
        <Loader />
      ) : (
        <ThoughtsContainer thoughts={thoughts} getThoughts={getThoughts} />
      )}
    </div>
  );
};

const mapStateToProps = ({ auth, thoughts }) => ({
  isLoading: auth.isLoading,
  user: auth.user,
  error: auth.error,
  thoughts: thoughts.thoughts,
});

export default connect(mapStateToProps, { getThoughts })(Home);
