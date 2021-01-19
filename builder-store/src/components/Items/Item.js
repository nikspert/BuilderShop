import React from "react";
import { Card, Button } from "react-bootstrap";
import "../../Styles/Styles.css";

import { useHistory } from "react-router-dom";

function Item(props) {
  const history = useHistory();
  const Item = props.Item;
  let footerLinks;
  if (props.LoggedIn && props.user?.role === "admin") {
    footerLinks = (
      <>
        <Button
          onClick={() => {
            history.push(`/EditItem/${Item._id}`);
          }}
          variant="outline-info"
        >
          Edit
        </Button>

        <Button
          onClick={props.handleItemDelete.bind(this, Item._id)}
          variant="outline-danger"
        >
          Delete
        </Button>
      </>
    );
  } else if (props.user?.role === "user") {
    footerLinks = (
      <>
        <Button
          onClick={props.handleItemBuy.bind(this, Item)}
          variant="outline-primary"
        >
          Buy
        </Button>
      </>
    );
  } else {
    footerLinks = <></>;
  }

  return (
    <Card className="Item">
      <Card.Body>
        <Card.Title>{Item.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {Item.cost + "$"}
        </Card.Subtitle>
        <Card.Text>{Item.description}</Card.Text>
        {footerLinks}
      </Card.Body>
    </Card>
  );
}

export default Item;
