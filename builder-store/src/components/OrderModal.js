import React from 'react';
import {Form,Modal,Table,Button, Alert } from 'react-bootstrap';

import {createOrder} from '../API/Order';

export default class OrderModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal:false,
            formStatus:"Pending"
        };
      }
      

      handleOrderRemoveItem=(item)=>{
        let order=JSON.parse(localStorage.getItem('order'))||[];
        const index=order.findIndex(product=>{
          return product.title===item.title;
        });
        order.splice(index,1);
        localStorage.setItem('order', JSON.stringify(order));
        this.forceUpdate();
      }

      dispayOrderItems=()=>{      
        let order=JSON.parse(localStorage.getItem('order'))||[];
        return order.map(product=>
        { 
          return(<tr key={product.title}>
            <td>{product.title}</td>
            <td>{product.count}</td>
            <td><Button onClick={this.handleOrderRemoveItem.bind(this,product)} variant="danger">X</Button></td>
          </tr>); 
        });
      }

      handleOrderCreate=e=>{
          e.preventDefault();
      
          const formData = new FormData(e.target),
          formDataObj = Object.fromEntries(formData.entries());
      
          let order=JSON.parse(localStorage.getItem('order'));
            console.log(order);
            if(order!==null&&order.length!==0)
            {    
              order=order.map(product=>
                {delete product['title']
                  return product });

              createOrder({...formDataObj, order},"Bearer "+this.props.user.token)
                .then(result=>{
                    if(!result.success) throw new Error("Failed to create item");
                        localStorage.setItem('order', "null");
                        this.forceUpdate();
                        this.setState({
                          formStatus:"Success" 
                          });
                })
                .catch(error=>{
                    console.log(error);
                    this.setState({
                      formStatus:"Error" 
                      });
                });
            }
            else{
              this.setState({
                formStatus:"Error" 
                });
            }
      }


       close=()=> {
        this.setState({ showModal: false, formStatus: "Pending" });
      }
    
      open=()=> {
        this.setState({ showModal: true });
      }
    

      formMessage=()=>{
        const status=this.state.formStatus;  
        switch(status){
            case "Success":{
                return (<Alert variant="success">Order was succesfully submited. We will contact you soon</Alert>); }
            case "Error":{return (<Alert variant="danger">
              Error occured while creating an order, check if your inputs are correct or if you added any items
              </Alert>);}
            case "Pending":{return (<Alert variant="light">Fill the fields below to create an order</Alert>);}
            default: {return (<Alert variant="light">Fill the fields below to create an order</Alert>);}
        }
      }

      render() {
        
        return (
          <div>
            <Button
              bsstyle="primary"
              bssize="large"
              onClick={this.open}
            >
              Order
            </Button>
    
            <Modal show={this.state.showModal} onHide={this.close}>
              <Modal.Header closeButton>
                <Modal.Title>Order</Modal.Title>
              </Modal.Header>
              
              <Form onSubmit={this.handleOrderCreate}>            
              <Modal.Body>
            {this.formMessage()}
              <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Item title</th>
                      <th>Item count</th>
                      <th>Remove item</th>
                    </tr>
                  </thead>
                  <tbody>
                  {this.dispayOrderItems()}
                  </tbody>
                </Table>
                <Form.Group controlId="formBasicEmail">
                <Form.Label>Phone number</Form.Label>
                    <Form.Control type="text" placeholder="000-000-0000" name="phone"/>
                        <Form.Text  className="text-muted">
                        We'll never share your phone number with anyone else.
                        </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                <Form.Label>Order addition</Form.Label>
                 <Form.Control defaultValue={""} as="textarea" rows={3} placeholder="Addition" name="addition" />
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