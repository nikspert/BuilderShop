import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Col, Button, Spinner } from "react-bootstrap";
import FormMessage from "./FormMessage";

export default function FormContainerPage(props) {
  const [formState, setFormState] = useState("pending");
  let { id } = useParams();
  // const formMessage=()=>{
  //   let status=formState;
  //   switch (status) {
  //       case "succsess": {
  //         return (
  //           <Alert variant="success">
  //             {props.objective} was completed succesfully
  //           </Alert>
  //         );
  //       }

  //       case "error": {
  //         return (
  //           <Alert variant="danger">
  //             Error occured while {props.objective}, check if your inputs are
  //             correct
  //           </Alert>
  //         );
  //       }
  //       case "loading": {
  //         return (
  //           <Alert variant="primary">
  //             <Spinner animation="border" />
  //             {props.objective} in proggress
  //           </Alert>
  //         );
  //       }
  //       case "pending": {
  //         return (
  //           <Alert variant="light">
  //             Fill the fields below to perform {props.objective}
  //           </Alert>
  //         );
  //       }
  //       default: {
  //         return (
  //           <Alert variant="light">
  //             Fill the fields below to perform {props.objective}
  //           </Alert>
  //         );
  //       }
  //     }
  // }
  const submitButton = () => {
    if (formState === "loading") {
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

  return (
    <>
      {formState === "success" && props.reddirectComponent}

      <Container className="Container">
        <Col md={5}>
          <FormMessage
            status={formState}
            objective={props.objective}
          ></FormMessage>

          {props.children(submitButton, setFormState, id)}
        </Col>
      </Container>
    </>
  );
}
