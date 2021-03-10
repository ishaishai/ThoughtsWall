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
  const [expanded, setExpanded] = useState(true);
  return (
    <Navbar
      onToggle={() => setExpanded(!expanded)}
      expanded={expanded}
      expand="lg"
    >
      <Navbar.Brand className="navbar-brand" href="/">
        Thoughts Wall
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="nav-items">
        {user ? (
          <div className="welcome-msg">{`Hello ${user.username}`}</div>
        ) : null}
        <Nav>
          {!user ? (
            <Nav.Link
              as={Link}
              to="/login"
              onSelect={() => setExpanded(!expanded)}
              eventKey="2"
            >
              Login
            </Nav.Link>
          ) : (
            <Nav.Link
              onSelect={() => setExpanded(!expanded)}
              onClick={logout}
              eventKey="5"
            >
              Logout
            </Nav.Link>
          )}
          {!user ? (
            <Nav.Link
              onSelect={() => setExpanded(!expanded)}
              as={Link}
              to="/register"
              eventKey="3"
            >
              Register
            </Nav.Link>
          ) : (
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item
                onSelect={() => setExpanded(!expanded)}
                as={Link}
                to="/profile"
              >
                Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item
                onSelect={() => setExpanded(!expanded)}
                as={Link}
                to="/my-thoughts"
              >
                Thoughts
              </NavDropdown.Item>
              <NavDropdown.Item
                onSelect={() => setExpanded(!expanded)}
                as={Link}
                to="/create-thought"
              >
                Create Thought
              </NavDropdown.Item>
            </NavDropdown>
          )}
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