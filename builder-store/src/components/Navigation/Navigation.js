import React from 'react';
import { Navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';
import SignInModal from './SignInModal';
import OrderModal from '../Order/OrderModal';
import '../../Styles/Styles.css';


class Navigation extends React.Component {

    render() {


      let NavComponent;
      if (!this.props.LoggedIn){          
          NavComponent=(<SignInModal onSubmit={this.props.onSubmit}></SignInModal>)
          }else { 
            this.props.user.role==='user'? 
            NavComponent=(<><OrderModal user={this.props.user}></OrderModal>
            <Button onClick={this.props.onLogout} variant="outline-success">
              Logout {this.props.user.name}
            </Button></>):
            NavComponent=(
            <Button onClick={this.props.onLogout} variant="outline-success">
            Logout {this.props.user.name}
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
          <Form onSubmit={this.props.onSearchFormSubmit} inline>
            <FormControl type="text" placeholder="Search" name="request" className="mr-sm-2" />
            <Button variant="outline-success" type="submit">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
      );
    }
  }

  export default Navigation;
