import { useState, useEffect } from "react";
import axios from "axios";
import ThoughtContainer from "../Thoughts/ThoughtsContainer";
import { Redirect } from "react-router";
import Loader from "../Loader";
import { connect } from "react-redux";

const MyThoughts = ({ history, isLoading, user, error }) => {
  const [thoughts, setThoughts] = useState([]);
  useEffect(async () => {
    //need to add action so a loading will pop while bringing the thougths
    const response = await axios.get("/api/thoughts/my-thoughts");
    console.log(response.data);
    setThoughts(response.data);
  }, []);

  if (!user) {
    history.push("/");
  }
  if (isLoading) {
    return (
      <div className="Loading">
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <div className="mythoughts-title">My Thoughts</div>
      <ThoughtContainer
        toggleThoughtCreate={false}
        thoughts={thoughts}
      ></ThoughtContainer>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({
  isLoading: auth.isLoading,
  user: auth.user,
});

export default connect(mapStateToProps, null)(MyThoughts);
