import React, { useEffect } from "react";
import { Form } from "react-bootstrap";

export default function SignInForm(props) {
  let { setFormState } = props;
  useEffect(() => setFormState("pending"), [setFormState]);
  return (
    <Form
      onSubmit={(e) => {
        props.onSubmit(e, props.setFormState);
      }}
    >
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
      {props.submitButton()}
    </Form>
  );
}
