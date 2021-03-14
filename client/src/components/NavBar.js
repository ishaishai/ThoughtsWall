import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/index";
import { useState } from "react";

const NavBar = ({ user, logout }) => {
  const [expanded, setExpanded] = useState(false);

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
              <Nav.Link
                onSelect={foldNavMenu}
                as={Link}
                to="/create-thought"
                eventKey="5"
              >
                Create Thought
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
        {/* <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form> */}
      </Navbar.Collapse>
    </Navbar>
  );
};

const mapStateToProps = ({ auth }) => ({
  user: auth.user,
});

export default connect(mapStateToProps, { logout })(NavBar);
