import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Col } from "react-bootstrap";
import { changeFormStatus } from "../../Redux/actions";
import FormMessage from "./FormMessage";
import FormSubmitButton from "./FormSubmitButton";

function FormContainerPage(props) {
  let { id } = useParams();
  const { setFormState } = props;
  useEffect(() => {
    console.log("FCP useEffecr pending");
    setFormState("pending");
    return () => {
      setFormState("pending");
    };
  }, [setFormState]);
  return (
    <>
      {props.formState === "success" && props.reddirectComponent}

      <Container className="Container">
        <Col md={5}>
          <FormMessage
            status={props.formState}
            objective={props.objective}
          ></FormMessage>

          {props.children(FormSubmitButton(props.formState), setFormState, id)}
        </Col>
      </Container>
    </>
  );
}
const mapStateToProps = function (state) {
  return {
    user: state.user,
    LoggedIn: state.LoggedIn,
    items: state.items,
    searchRequest: state.searchRequest,
    formState: state.formState,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setFormState: (status) => {
      dispatch(changeFormStatus(status));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FormContainerPage);
