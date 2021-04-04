import ThoughtsContainer from "./Thoughts/ThoughtsContainer";
import axios from "axios";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import "../styles/App.css";
import Welcome from "./Welcome";
import Loader from "./Loader";

const Home = ({ user }) => {
  const [thoughts, setThoughts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getThoughts = async () => {
    setIsLoading(true);
    const response = await axios.get("/api/thoughts/get-all-thoughts");
    setThoughts(response.data);
    setIsLoading(false);
  };

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

const mapStateToProps = ({ auth }) => ({
  isLoading: auth.isLoading,
  user: auth.user,
  error: auth.error,
});

export default connect(mapStateToProps, null)(Home);
