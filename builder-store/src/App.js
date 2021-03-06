
import React from 'react';
import Items from './components/Items/Items';
import Navigation from './components/Navigation/Navigation';
import {Container} from "react-bootstrap";
import {SignIn, SignUp} from './API/Auth';


class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      LoggedIn: false,
      user: null,
    
      searchRequest: ""
      
    };
  } 

   onLogout=()=>{
    this.setState({LoggedIn:false,user:null})
  };

  onSignInFormSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target),
        formDataObj = Object.fromEntries(formData.entries());
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

    onSignUpFormSubmit = e => {
      e.preventDefault();
      const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());
      SignUp(formDataObj)
      .then((result) => {
        if(!result.success) throw new Error("Failed to sign up")  
          this.setState({
           LoggedIn:true,
           user:result});})
      .catch(error => {
        alert(error);})            
      }

    onSearchFormSubmit=e=>{
      e.preventDefault();
      const formData = new FormData(e.target),
      formDataObj = Object.fromEntries(formData.entries());      
      
      const search=formDataObj.request.toLowerCase();
      this.setState({searchRequest:search});
    }

   

    
  render() {
    return(
    <>
    <Navigation onSearchFormSubmit={this.onSearchFormSubmit} onSignInFormSubmit={this.onSignInFormSubmit}
     onSignUpFormSubmit={this.onSignUpFormSubmit} onLogout={this.onLogout}
     LoggedIn={this.state.LoggedIn} user={this.state.user}></Navigation>
    
    <Container className="Container">

        <Items getDisplayItems={this.getDisplayItems} searchRequest={this.state.searchRequest} 
        LoggedIn={this.state.LoggedIn} user={this.state.user}></Items>
        
        
   </Container>
    </>
    )};
}

export default App;
