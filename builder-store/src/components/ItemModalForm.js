import React from 'react';
import {Form,Modal,Button, Alert} from 'react-bootstrap';
import './Styles/Styles.css';


export default class ItemModalForm extends React.Component {

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
            case "Success":{
                return (<Alert variant="success">Item {this.props.title} was succesfull</Alert>); }
            case "Error":{return (<Alert variant="danger">Error occured while item {this.props.title}, check if your inputs are correct</Alert>);}
            case "Pending":{return (<Alert variant="light">Fill the fields below to {this.props.title} an item</Alert>);}
            default: {return (<Alert variant="light">Fill the fields below to {this.props.title} an item</Alert>);}
        }

        
      }

      render() {
    
         const message=this.formMessage()

        return (
          <>
    
             {this.props.children(this.open)}
       
            <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>{this.props.title} item</Modal.Title>
              </Modal.Header>
              
              <Form id='editForm' onSubmit={(e)=>{this.props.handleSubmit(e,this.props.item?._id)}}>            
              <Modal.Body>
                 {message} 
                <Form.Group controlId="formBasicText">
                <Form.Label>Item name</Form.Label>
                    <Form.Control defaultValue={this.props.item?.name||""} type="text" placeholder="Name" name="name"/>
                </Form.Group>

                <Form.Group controlId="formBasicNumber">
                  <Form.Label>Item price</Form.Label>
                  <Form.Control defaultValue={this.props.item?.cost||""} type="number" placeholder="Price" name="cost" />
                </Form.Group>
                
                <Form.Group controlId="formBasicNumber">
                  <Form.Label>Item amount</Form.Label>
                  <Form.Control defaultValue={this.props.item?.amount||""} type="number" placeholder="Amount" name="amount" />
                  <Form.Label>Item units</Form.Label>
                    <Form.Control defaultValue={this.props.item?.unit||""} type="text" placeholder="Unit" name="unit"/>
                </Form.Group>
                
                <Form.Group controlId="formBasicText">
                <Form.Label>Item description</Form.Label>
                 <Form.Control defaultValue={this.props.item?.description||""} as="textarea" rows={3} placeholder="Description" name="description" />
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