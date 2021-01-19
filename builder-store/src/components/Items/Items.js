import React from "react";
import { Card, Alert, Spinner } from "react-bootstrap";
import "../../Styles/Styles.css";

import Item from "./Item";

import { useHistory } from "react-router-dom";

function Items(props) {
  let history = useHistory();
  const { Error, isLoaded } = props;

  const itemFilter = (request) => {
    return props.Items.filter((item) =>
      item.name.toLowerCase().includes(request)
    );
  };

  if (Error) {
    return (
      <Alert variant="danger">
        Error occured while loading items: {Error.message}
      </Alert>
    );
  } else if (!isLoaded) {
    return (
      <Alert variant="warning">
        <Spinner animation="border" />
        Loading items, please wait...
      </Alert>
    );
  } else {
    const shopItems = [];
    itemFilter(props.searchRequest).forEach((item) => {
      shopItems.push(
        <Item
          handleItemBuy={props.handleItemBuy}
          handleItemDelete={props.handleItemDelete}
          handleItemUpdate={props.handleItemUpdate}
          formStatus={props.formStatus}
          refreshForm={props.refreshForm}
          LoggedIn={props.LoggedIn}
          user={props.user}
          Item={item}
          key={item._id}
        />
      );
    });

    let itemsContent;
    if (props.LoggedIn && props.user.role === "admin") {
      itemsContent = (
        <div className="Items">
          {shopItems}
          <Card
            onClick={() => {
              history.push("/CreateItem");
            }}
            className="AddItem"
          >
            <Card.Body>
              <p className="noselect">+</p>
            </Card.Body>
          </Card>
        </div>
      );
    } else itemsContent = <div className="Items">{shopItems}</div>;

    return <div className="Items">{itemsContent}</div>;
  }
}

export default Items;
