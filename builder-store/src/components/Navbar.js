import React from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import SignInModal from './SignInModal';
import './Styles/Styles.css';
import {SignIn} from '../API/Auth';

class Navigation extends React.Component {

  
  constructor(props) {
    super(props);
   
  }

  

    render() {
      let component;
      if (!this.props.LoggedIn)
          {
       component=(<SignInModal onSubmit={this.props.onSubmit}></SignInModal>)
          }else{
         component=(<Button onClick={this.props.onLogout} variant="outline-success">Logout {this.props.user.name}</Button>)
          }  
      return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">СтройБудSHOP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          {component}
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
