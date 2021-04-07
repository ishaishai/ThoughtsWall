import { Navbar, Nav } from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/index";
import { useState, useEffect } from "react";
import "../styles/Navbar.css";
import axios from "axios";

const NavBar = ({ user, logout }) => {
  const [expanded, setExpanded] = useState(false);
  const [visited, setVisited] = useState(false);

  useEffect(async () => {
    if (!visited) {
      setVisited(true);
      const response = await axios.post(
        "https://loggingapp-server.herokuapp.com/api/log",
        {
          source: "Thoughts-Wall",
        }
      );
      console.log(response.data);
    }
  }, []);

  const foldNavMenu = () => {
    if (expanded) {
      setExpanded(false);
    }
  };
  return (
    <Navbar
      onToggle={() => setExpanded(!expanded)}
      expanded={expanded}
      expand="lg"
      className="navbar"
    >
      <Navbar.Brand className="navbar-brand" href="/">
        Thoughts Wall
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="nav-items">
        <Nav>
          {user ? (
            <div className="welcome-msg">{`Hello ${user.username}`}</div>
          ) : null}
          <Nav.Link onSelect={foldNavMenu} as={Link} to="/" eventKey="1">
            Home
          </Nav.Link>

          {!user ? (
            <Nav.Link as={Link} to="/login" onSelect={foldNavMenu} eventKey="2">
              Login
            </Nav.Link>
          ) : (
            <>
              <Nav.Link
                onSelect={foldNavMenu}
                as={Link}
                to="/profile"
                eventKey="3"
              >
                Profile
              </Nav.Link>

              <Nav.Link
                onSelect={foldNavMenu}
                as={Link}
                to="/my-thoughts"
                eventKey="4"
              >
                My Thoughts
              </Nav.Link>
              <Nav.Link onSelect={foldNavMenu} onClick={logout} eventKey="6">
                Logout
              </Nav.Link>
            </>
          )}
          {!user ? (
            <Nav.Link
              onSelect={foldNavMenu}
              as={Link}
              to="/register"
              eventKey="3"
            >
              Register
            </Nav.Link>
          ) : null}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

export default connect(mapStateToProps, { logout })(NavBar);
