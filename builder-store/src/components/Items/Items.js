import React, { useEffect } from "react";
import { Card } from "react-bootstrap";
import "../../Styles/Styles.css";

import Item from "./Item";
import { Message } from "../Forms/FormMessage";

import { useHistory } from "react-router-dom";

function Items(props) {
  const history = useHistory();
  const {setFormState}=props
  useEffect(() => {
    const unlisten = history.listen(() => {
      setFormState("pending");
    });
    return () => {
      unlisten();
    };
  }, [setFormState,history]);

  const itemFilter = (request) => {
    return props.Items.filter((item) =>
      item.name.toLowerCase().includes(request)
    );
  };

  return (
    <>
      <Message status={props.formState}></Message>
        <div className="Items">
          {itemFilter(props.searchRequest).map((item) => (
            <Item
              formStatus={props.formStatus}
              refreshForm={props.refreshForm}
              LoggedIn={props.LoggedIn}
              user={props.user}
              Item={item}
              key={item._id}
            />
          ))}
          {props.LoggedIn && props.user.role === "admin" ? (
            <Card
              onClick={() => {
                history.push("/CreateItem");
              }}
              className="AddItem"
            >
              <Card.Body>
                <p className="noselect">+</p>
              </Card.Body>
            </Card>
          ) : null}
       </div>     
    </>
  );
}

export default Items;
