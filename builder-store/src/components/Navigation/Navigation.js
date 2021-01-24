import React from "react";
import { Navbar, Nav, Form, Button, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../Styles/Styles.css";

function Navigation(props) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        СтройБудSHOP
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          {!props.LoggedIn ? (
            <>
              <Nav.Link as={Link} to="/SignUp">
                Sign up
              </Nav.Link>
              <Nav.Link as={Link} to="/SignIn">
                Sign In
              </Nav.Link>
            </>
          ) : props.user.role === "user" ? (
            <>
              <Nav.Link as={Link} to="/Order">
                Order
              </Nav.Link>
              <Button onClick={props.onLogout} variant="outline-success">
                Logout {props.user.name}
              </Button>
            </>
          ) : (
            <Button onClick={props.onLogout} variant="outline-success">
              Logout {props.user.name}
            </Button>
          )}
        </Nav>
        <Form onSubmit={props.handleSearch} inline>
          <FormControl
            type="text"
            placeholder="Search"
            name="request"
            className="mr-sm-2"
          />
          <Button variant="outline-success" type="submit">
            Search
          </Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Navigation;
