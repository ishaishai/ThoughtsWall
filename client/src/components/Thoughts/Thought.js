import { useState, useEffect } from "react";
import React from "react";
import { BiShow } from "react-icons/bi";
import CommentsModal from "../Comments/CommentsModal";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import "../../styles/Thoughts.css";
import { FaHamburger } from "react-icons/fa";
import { RiMenuFoldLine } from "react-icons/ri";
import Contact from "../Personal/Contact";
import { deleteThought } from "../../actions/index";

const Thought = ({ user, id, color, date, owner, text, deleteThought }) => {
  const [chosen, setChosen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [cardRef] = useState(React.createRef());
  const [backupHeight, setBackupHeight] = useState("");
  const [collapse, setCollapse] = useState(true);
  const [contactToggle, setContactToggle] = useState(false);

  useEffect(() => {
    setBackupHeight(`${cardRef.current.offsetHeight}px`);
  }, []);

  const focusThought = () => {
    revealThoughtMenu();
    setChosen(!chosen);
  };

  const revealThoughtMenu = () => {
    setCollapse(!collapse);
  };
  const revealContact = () => {
    setContactToggle(!contactToggle);
    setCollapse(!collapse);
  };

  useEffect(() => {
    let thoughtMenu = document.getElementById(id);
    if (collapse) {
      thoughtMenu.style.height = "0%";
    } else {
      thoughtMenu.style.height = "100%";
    }
  }, [collapse]);

  useEffect(() => {
    let contactOption = document.getElementById(`contact-${id}`);

    if (contactToggle) {
      contactOption.style.height = "100%";
      contactOption.style.minHeight = "25vh";
    } else {
      contactOption.style.height = "0%";
      contactOption.style.minHeight = "0vh";
    }
  }, [contactToggle]);

  return (
    <>
      <div
        className="thought-box"
        style={{
          display: `${chosen ? "block" : "none"}`,
          backgroundColor: "transparent",
          width: "10rem",
          height: `${backupHeight}`,
          border: "none",
        }}
      ></div>
      <div
        ref={cardRef}
        className={`thought-box ${chosen ? "hover-thought-card" : ""} `}
        //style={{ backgroundColor: color }}
      >
        <Card.Body>
          <Card.Subtitle className="mb-2">
            Shared {date} by {owner}
            {collapse ? (
              <FaHamburger onClick={revealThoughtMenu} />
            ) : (
              <RiMenuFoldLine onClick={revealThoughtMenu} />
            )}
          </Card.Subtitle>
          <Contact setContactToggle={setContactToggle} owner={owner} id={id} />
          <div id={id} className={`thought-menu`}>
            <ul>
              <li>
                <div className="thought-menu-item">Profile</div>
              </li>
              <li>
                {user && (
                  <div className="thought-menu-item" onClick={revealContact}>
                    Contact
                  </div>
                )}
              </li>
              <li>
                <div
                  className="thought-menu-item"
                  onClick={() => setShowComments(!showComments)}
                >
                  Comments
                </div>
              </li>
              {owner === user.username ? (
                <li>
                  <div
                    className="thought-menu-item delete"
                    onClick={() => deleteThought(id)}
                  >
                    Delete
                  </div>
                </li>
              ) : null}
              {/* <li>
                <div className="thought-menu-item" onClick={focusThought}>
                  {`${chosen ? "Close" : "View"}`}
                </div>
              </li> */}
            </ul>
          </div>

          <Card.Text>{text}</Card.Text>
          <div className="thoughtTogglesBox"></div>
        </Card.Body>
        <>
          {showComments && (
            <CommentsModal
              id={id}
              showComments={showComments}
              setShowComments={setShowComments}
            />
          )}
        </>
      </div>
    </>
  );
};

const mapStateToProps = ({ auth, thoughts }) => ({
  isLoading: auth.isLoading,
  user: auth.user,
  error: auth.error,
  thoughtsLoading: thoughts.isLoading,
});

export default connect(mapStateToProps, { deleteThought })(Thought);
