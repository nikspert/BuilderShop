import React from 'react';
import {Form,Modal,Button } from 'react-bootstrap';


export default class SignInModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal:false
        };
      }
    



       close=()=> {
        this.setState({ showModal: false });
      }
    
      open=()=> {
        this.setState({ showModal: true });
      }
    
      render() {
        
        return (
          <div>
            <Button
              bsstyle="primary"
              bssize="large"
              onClick={this.open}
            >
              Sign in
            </Button>
    
            <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>Sign in</Modal.Title>
              </Modal.Header>
              
              <Form>            
              <Modal.Body>
    
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email"/>
                        <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                        </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" name="password" />
                </Form.Group>
    
              </Modal.Body>
              <Modal.Footer>
              <Button variant="secondary" onClick={this.close}>
            Close
          </Button>
          <Button variant="primary" type="submit">
                Submit
                </Button>
              </Modal.Footer>
              </Form>
   
            </Modal>
          </div>
        );
      }
}