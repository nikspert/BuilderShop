import React from 'react';
import {Card} from "react-bootstrap";
import './Styles/Styles.css';


class Item extends React.Component {
  
  
  render() {
    const Item = this.props.Item;
    let footerLinks;
    if(this.props.LoggedIn)
    {
      footerLinks=(<>
      <Card.Link href="#">Delete item</Card.Link>
      <Card.Link href="#">Edit item</Card.Link>
      </>)
    }
    else{
      footerLinks=(<>
        <Card.Link href="#">View item</Card.Link>
        <Card.Link href="#">Buy item</Card.Link>
        </>)
    }
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