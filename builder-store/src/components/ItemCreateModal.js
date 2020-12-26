import React from 'react';
import {Form,Modal,Button,Card, Alert} from 'react-bootstrap';
import './Styles/Styles.css';


export default class ItemCreateModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal:false
        };
      }

       close=()=> {
        this.setState({ showModal: false });
        this.props.refreshForm();
      }
    
      open=()=> {
        this.setState({ showModal: true });
      }
    
      formMessage=()=>{
        const status=this.props.formStatus;  
        switch(status){
            case "Created":{
                // this.creationForm.reset();
                return (<Alert variant="success">Item was succesfuly created</Alert>); }
            case "Error":{return (<Alert variant="danger">Error occured while creating an item, check if your inputs are correct</Alert>);}
            case "Pending":{return (<Alert variant="light">Fill the fields below to create an item</Alert>);}
            default: {return (<Alert variant="light">Fill the fields below to create an item</Alert>);}
        }

        
      }

      render() {
    
        const message=this.formMessage()

        return (
          <>
                <Card onClick={this.open} className="AddItem">
                  <Card.Body>
                   <p className="noselect">+</p>
                   </Card.Body>
                  </Card>

    
            <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>Create item</Modal.Title>
              </Modal.Header>
              
              <Form id='creationForm' ref={ form => this.creationForm = form } onSubmit={this.props.handleItemCreate}>            
              <Modal.Body>
                {message}
                <Form.Group controlId="formBasicText">
                <Form.Label>Item name</Form.Label>
                    <Form.Control type="text" placeholder="Name" name="name"/>
                </Form.Group>

                <Form.Group controlId="formBasicNumber">
                  <Form.Label>Item price</Form.Label>
                  <Form.Control type="number" placeholder="Price" name="cost" />
                </Form.Group>
                
                <Form.Group controlId="formBasicNumber">
                  <Form.Label>Item amount</Form.Label>
                  <Form.Control type="number" placeholder="Amount" name="amount" />
                  <Form.Label>Item units</Form.Label>
                    <Form.Control type="text" placeholder="Unit" name="unit"/>
                </Form.Group>
                
                <Form.Group controlId="formBasicNumber">
                <Form.Label>Item description</Form.Label>
                 <Form.Control as="textarea" rows={3} placeholder="Description" name="description" />
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
          </>
        );
      }
}