import React from 'react';
import {Card,Button} from "react-bootstrap";
import '../../Styles/Styles.css';

import ItemModalForm from './ItemModalForm';

class Item extends React.Component {
  
  render() {
    const Item = this.props.Item;
    let footerLinks;
    if(this.props.LoggedIn&&this.props.user?.role==='admin')
    {
      footerLinks=(<>       
        <ItemModalForm title="Update" item={Item} refreshForm={this.props.refreshForm} 
       formStatus={this.props.formStatus} handleSubmit={this.props.handleItemUpdate}>
         {openMethod=>{
         return <Button onClick={openMethod}  variant="outline-info">Edit</Button>
         }}
         </ItemModalForm>
       <Button onClick={this.props.handleItemDelete.bind(this,Item._id)} variant="outline-danger">Delete</Button>
      </>)
    }
    else if(this.props.user?.role==='user'){
      footerLinks=(<>
       <Button  onClick={this.props.handleItemBuy.bind(this,Item)} variant="outline-primary">Buy</Button>
        </>)
    }
    else{
      footerLinks=(<></>)}

    return (
        <Card className="Item">
          <Card.Body>
            <Card.Title>{Item.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{Item.cost+"$"}</Card.Subtitle>
            <Card.Text>
                {Item.description}
            </Card.Text>
              {footerLinks}
          </Card.Body>
        </Card>
            );
          }
        }

export default Item;