import React from "react";
import { Form } from "react-bootstrap";

export default function ItemForm(props) {
  const item = props.items?.find((item) => item._id === props.itemId);
  return (
    <>
      <Form
        id="editForm"
        onSubmit={(e) => {
          props.onSubmit(e, props.setFormState, props.itemId);
        }}
      >
        <Form.Group controlId="formBasicText">
          <Form.Label>Item name</Form.Label>
          <Form.Control
            defaultValue={item?.name || ""}
            type="text"
            placeholder="Name"
            name="name"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicNumber">
          <Form.Label>Item price</Form.Label>
          <Form.Control
            defaultValue={item?.cost || ""}
            type="number"
            placeholder="Price"
            name="cost"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicNumber">
          <Form.Label>Item amount</Form.Label>
          <Form.Control
            defaultValue={item?.amount || ""}
            type="number"
            placeholder="Amount"
            name="amount"
            required
          />
          <Form.Label>Item units</Form.Label>
          <Form.Control
            defaultValue={item?.unit || ""}
            type="text"
            placeholder="Unit"
            name="unit"
            required
          />
        </Form.Group>
        <Form.Group controlId="formBasicText">
          <Form.Label>Item description</Form.Label>
          <Form.Control
            defaultValue={item?.description || ""}
            as="textarea"
            rows={3}
            placeholder="Description"
            name="description"
            required
          />
        </Form.Group>
        {props.submitButton}
      </Form>
    </>
  );
}
