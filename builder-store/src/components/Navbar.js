import React from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import SignInModal from './SignInModal';
import './Styles/Styles.css';


class Navigation extends React.Component {
    
    render() {

      return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">СтройБудSHOP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          <SignInModal></SignInModal>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      );
    }
  }

  export default Navigation;
