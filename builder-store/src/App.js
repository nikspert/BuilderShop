
import React from 'react';
import Items from './components/Items';
import Navigation from './components/Navbar';
import {Container} from "react-bootstrap";
import {SignIn} from './API/Auth';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      LoggedIn: false,
      user: null
      
    };
  } 
   onLogout=()=>{
    this.setState({LoggedIn:false,user:null})
  };

  onSignInFormSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries())
       SignIn(formDataObj)
       .then((result) => {
           if(!result.success) throw new Error("Failed to login")  
           this.setState(
             {
              LoggedIn:true,
              user:result
            });
          }).catch(error => {
            alert(error);
            })            
}
  render() {
    return(
    <>
    <Navigation onSubmit={this.onSignInFormSubmit} onLogout={this.onLogout}
     LoggedIn={this.state.LoggedIn} user={this.state.user}></Navigation>
    
    <Container className="Container">

        <Items LoggedIn={this.state.LoggedIn} user={this.state.user}></Items>
        
        
   </Container>
    </>
    )};
}

export default App;
