import React, { useEffect, useState } from "react";
import { Form, Button, Table } from "react-bootstrap";
import { requestHandler, getFormData } from "../../../utils/helpers";
import { createOrder } from "../../../API/Order";

export default function OrderForm(props) {
  const [orderItems, setOrderItems] = useState([]);
  useEffect(() => {
    const order = JSON.parse(localStorage.getItem("order"));
    if (order) {
      setOrderItems(order);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("order", JSON.stringify(orderItems));
  }, [orderItems]);

  const handleOrderRemoveItem = (item) => {
    setOrderItems(orderItems.filter((orderItem) => orderItem !== item));
  };

  const handleOrderCreate = (e, setFormState) => {
    let orderInfo = getFormData(e);
    let order = JSON.parse(localStorage.getItem("order"));
    if (order == null || order.length === 0) {
      setFormState("error");
    } else {
      order = order.map((orderItem) => {
        delete orderItem["title"];
        return orderItem;
      });
      requestHandler(createOrder, setFormState, {
        Bearer: `Bearer ${props.user.token}`,
        data: { ...orderInfo, order },
      })
        .then((result) => {
          localStorage.setItem("order", "null");
          setOrderItems([]);
        })
        .catch((error) => {
          console.log(error);
          setFormState("error");
        });
    }
  };
  return (
    <div>
      <Form
        onSubmit={(e) => {
          handleOrderCreate(e, props.setFormState);
        }}
      >
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Item title</th>
              <th>Item count</th>
              <th>Remove item</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((orderItem) => {
              return (
                <tr key={orderItem.title}>
                  <td>{orderItem.title}</td>
                  <td>{orderItem.count}</td>
                  <td>
                    <Button
                      onClick={handleOrderRemoveItem.bind(this, orderItem)}
                      variant="danger"
                    >
                      X
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Phone number</Form.Label>
          <Form.Control type="text" placeholder="000-000-0000" name="phone" />
          <Form.Text className="text-muted">
            We'll never share your phone number with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Order addition</Form.Label>
          <Form.Control
            defaultValue={""}
            as="textarea"
            rows={3}
            placeholder="Addition"
            name="addition"
          />
        </Form.Group>
        {props.submitButton}
      </Form>
    </div>
  );
}
