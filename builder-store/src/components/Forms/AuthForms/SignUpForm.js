import React, { useEffect } from "react";
import { Form } from "react-bootstrap";

export default function SignUpForm(props) {
  let { setFormState } = props;
  useEffect(() => setFormState("pending"), [setFormState]);
  return (
    <Form
      onSubmit={(e) => {
        props.onSubmit(e, props.setFormState);
      }}
    >
      <Form.Group controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          defaultValue=""
          type="text"
          placeholder="Name"
          name="name"
        />
      </Form.Group>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" />
      </Form.Group>

      <Form.Group controlId="formBasicRole">
        <Form.Label>Role</Form.Label>
        <Form.Control as="select" defaultValue="user" name="role">
          <option>user</option>
          <option>admin</option>
        </Form.Control>
      </Form.Group>
      {props.submitButton()}
    </Form>
  );
}
