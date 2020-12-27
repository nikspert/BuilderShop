import React from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import OrderModal from '../Order/OrderModal';
import '../../Styles/Styles.css';


function Navigation(props) {




      let NavComponent;
      if (!props.LoggedIn){          
          NavComponent=(<><SignUpModal onSubmit={props.onSignUpFormSubmit}></SignUpModal><SignInModal onSubmit={props.onSignInFormSubmit}></SignInModal></>)
          }else { 
            props.user.role==='user'? 
            NavComponent=(<><OrderModal user={props.user}></OrderModal>
            <Button onClick={props.onLogout} variant="outline-success">
              Logout {props.user.name}
            </Button></>):
            NavComponent=(
            <Button onClick={props.onLogout} variant="outline-success">
            Logout {props.user.name}
            </Button>);          
          }
          
      return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">СтройБудSHOP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
       
          {NavComponent}
          </Nav>
          <Form onSubmit={props.onSearchFormSubmit} inline>
            <FormControl type="text" placeholder="Search" name="request" className="mr-sm-2" />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      );
    }
  

  export default Navigation;
