import React from "react";
import { Jumbotron, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => (
  <Jumbotron fluid>
    <Container>
      <h1>404 - Not Found!</h1>
      <p>
        The page you are looking for is not found. Return to home page.
        <Link to="/">Go Home</Link>
      </p>
    </Container>
  </Jumbotron>
);

export default NotFound;
