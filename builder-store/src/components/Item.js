import React from 'react';
import {Card} from "react-bootstrap";
import './Styles/Styles.css';


class Item extends React.Component {
  
  
  render() {
    const Item = this.props.Item;
    return (
<Card className="Item">
  <Card.Body>
    <Card.Title>{Item.name}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">{Item.cost+"$"}</Card.Subtitle>
    <Card.Text>
        {Item.description}
    </Card.Text>
    <Card.Link href="#">Delete item</Card.Link>
    <Card.Link href="#">Another Link</Card.Link>
  </Card.Body>
</Card>
    );
  }
}

export default Item;