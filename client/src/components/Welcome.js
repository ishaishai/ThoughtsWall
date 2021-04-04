import Thought from "../assets/thought.png";
const Welcome = () => {
  return (
    <div className="welcome-component">
      <div className="welcome-container">
        <img className="welcome-logo-img" src={Thought} />
        <div className="welcome-subcontainer">
          <div className="welcome-title">Hello.</div>
          <div className="welcome-text">
            Ever wanted to share just a thought?
          </div>

          <a className="welcome-start-link" href="#Thoughts">
            <button className="welcome-start">Start now!</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
