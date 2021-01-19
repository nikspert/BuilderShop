import React from "react";
import { Alert, Spinner } from "react-bootstrap";

export default function FormMessage(props) {
  switch (props.status) {
    case "succsess": {
      return (
        <Alert variant="success">
          {props.objective} was completed succesfully
        </Alert>
      );
    }

    case "error": {
      return (
        <Alert variant="danger">
          Error occured while {props.objective}, check if your inputs are
          correct
        </Alert>
      );
    }
    case "loading": {
      return (
        <Alert variant="primary">
          <Spinner animation="border" />
          {props.objective} in proggress
        </Alert>
      );
    }
    case "success": {
      return (
        <Alert variant="success">
          {props.objective} was succesfully completed
        </Alert>
      );
    }
    case "pending": {
      return (
        <Alert variant="light">
          Fill the fields below to perform {props.objective}
        </Alert>
      );
    }
    default: {
      return (
        <Alert variant="light">
          Fill the fields below to perform {props.objective}
        </Alert>
      );
    }
  }
}
