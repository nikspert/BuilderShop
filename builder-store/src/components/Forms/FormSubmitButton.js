import React from "react";
import {  Button, Spinner } from "react-bootstrap";

export default function submitButton(status){
    if (status === "loading") {
      return (
        <Button variant="warning" disabled>
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          Loading...
        </Button>
      );
    } else {
      return (
        <Button variant="primary" type="submit">
          Submit
        </Button>
      );
    }
  };
