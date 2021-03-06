import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <Navbar expand="lg">
      <Navbar.Brand className="navbar-brand" href="/">
        Thoughts Wall
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="nav-items">
        <Nav>
          <Nav.Link as={Link} to="/login" eventKey="2">
            Login
          </Nav.Link>
          <Nav.Link as={Link} to="/register" eventKey="3">
            Register
          </Nav.Link>
          <NavDropdown title="Menu" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.2">Thoughts</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">
              Create Thought
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
