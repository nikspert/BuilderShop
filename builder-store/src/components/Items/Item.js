import React from "react";
import { Card, Button } from "react-bootstrap";
import { connect } from "react-redux";
import "../../Styles/Styles.css";
import {
  makeRequest,
  deleteItem as deleteItemAction,
  changeFormStatus,
} from "../../Redux/actions";
import { deleteItem } from "../../API/Items";
import { useHistory } from "react-router-dom";

function Item(props) {
  const history = useHistory();
  const { Item, setFormState, makeRequest } = props;

  const handleItemBuy = (item) => {
    setFormState("loading");
    let order = JSON.parse(localStorage.getItem("order")) || [];
    const index = order.findIndex((product) => {
      return product.item === item._id;
    });
    index !== -1
      ? order[index].count++
      : order.push({ title: item.name, item: item._id, count: 1 });
    localStorage.setItem("order", JSON.stringify(order));
    setFormState("success");
  };

  const handleItemDelete = (id) => {
    makeRequest(deleteItem, deleteItemAction, {
      Bearer: `Bearer ${props.user.token}`,
      id,
    });
  };

  return (
    <Card className="Item">
      <Card.Body>
        <Card.Title>{Item.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {Item.cost + "$"}
        </Card.Subtitle>
        <Card.Text>{Item.description}</Card.Text>
        {props.LoggedIn && props.user?.role === "admin" ? (
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
              onClick={handleItemDelete.bind(this, Item._id)}
              variant="outline-danger"
            >
              Delete
            </Button>
          </>
        ) : props.user?.role === "user" ? (
          <Button
            onClick={handleItemBuy.bind(this, Item)}
            variant="outline-primary"
          >
            Buy
          </Button>
        ) : null}
      </Card.Body>
    </Card>
  );
}
const mapStateToProps = function (state) {
  return {
    user: state.user,
    loggedIn: state.loggedIn,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    makeRequest: (request, action, params) => {
      dispatch(makeRequest(request, action, params));
    },
    setFormState: (status) => {
      dispatch(changeFormStatus(status));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
