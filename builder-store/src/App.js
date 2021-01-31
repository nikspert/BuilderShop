import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./utils/components/PrivateRoute";

import { connect } from "react-redux";
import {
  makeRequest,
  createItem as createItemAction,
  getItems as getItemsAction,
  editItem as editItemAction,
  authorize,
  logout,
  changeFormStatus,
  changeSearchRequest,
} from "./Redux/actions";

import Items from "./components/Items/Items";
import Navigation from "./components/Navigation/Navigation";
import SignInForm from "./components/Forms/AuthForms/SignInForm";
import SignUpForm from "./components/Forms/AuthForms/SignUpForm";
import ItemForm from "./components/Forms/ItemForms/ItemForm";
import OrderForm from "./components/Forms/OrderForms/OrderForm";
import FormContainerPage from "./components/Forms/FormContainerPage";
import NotFound from "./utils/components/NotFound";

import { SignIn, SignUp } from "./API/Auth";
import { createItem, updateItem, getItems } from "./API/Items";
import { createOrder } from "./API/Order";
import { partial, getFormData, requestHandler } from "./utils/helpers";

function App(props) {
  const { makeRequest } = props;
  useEffect(() => {
    makeRequest(getItems, getItemsAction);
  }, [makeRequest]);

  const onLogout = () => {
    props.logout();
  };

  const authHandler = (authRequest, e, setFormState) => {
    let data = getFormData(e);
    makeRequest(authRequest, authorize, data);
  };
  const handleSignIn = partial(authHandler, SignIn);
  const handleSignUp = partial(authHandler, SignUp);

  const handleSearch = (e) => {
    const search = getFormData(e).request.toLowerCase();
    props.setSearchRequest(search);
  };

  const handleItemCreate = (e, setFormState) => {
    let data = getFormData(e);
    makeRequest(createItem, createItemAction, {
      Bearer: `Bearer ${props.user.token}`,
      data,
    });
  };

  const handleItemUpdate = (e, setFormState, id) => {
    let data = getFormData(e);
    makeRequest(updateItem, editItemAction, {
      Bearer: `Bearer ${props.user.token}`,
      data,
      id,
    });
  };

  const handleOrderCreate = (e, setFormState, setOrderItems) => {
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
  console.log(props);
  return (
    <Router>
      <Navigation
        handleSearch={handleSearch}
        onLogout={onLogout}
        LoggedIn={props.loggedIn}
        user={props.user}
      ></Navigation>
      <Switch>
        <Route exact path="/">
          <Container className="Container">
            <Items
              Items={props.items}
              searchRequest={props.searchRequest}
              LoggedIn={props.loggedIn}
              user={props.user}
              setFormState={props.setFormState}
              formState={props.formState}
            ></Items>
          </Container>
        </Route>
        <Route exact path="/SignIn">
          <FormContainerPage
            reddirectComponent={<Redirect to="/" />}
            objective={"Sign in"}
          >
            {(submitButton, setFormState) => {
              return (
                <SignInForm
                  onSubmit={handleSignIn}
                  submitButton={submitButton}
                  setFormState={setFormState}
                ></SignInForm>
              );
            }}
          </FormContainerPage>
        </Route>
        <Route exact path="/SignUp">
          <FormContainerPage
            reddirectComponent={<Redirect to="/" />}
            objective={"Sign up"}
          >
            {(submitButton, setFormState) => {
              return (
                <SignUpForm
                  onSubmit={handleSignUp}
                  submitButton={submitButton}
                  setFormState={setFormState}
                ></SignUpForm>
              );
            }}
          </FormContainerPage>
        </Route>
        <PrivateRoute LoggedIn={props.loggedIn} exact path="/CreateItem">
          <FormContainerPage objective={"Item creation"}>
            {(submitButton, setFormState) => {
              return (
                <ItemForm
                  onSubmit={handleItemCreate}
                  submitButton={submitButton}
                  setFormState={setFormState}
                ></ItemForm>
              );
            }}
          </FormContainerPage>
        </PrivateRoute>
        <PrivateRoute LoggedIn={props.loggedIn} exact path="/EditItem/:id">
          <FormContainerPage
            reddirectComponent={<Redirect to="/" />}
            objective={"Item editing"}
          >
            {(submitButton, setFormState, itemId) => {
              return (
                <ItemForm
                  onSubmit={handleItemUpdate}
                  items={props.items}
                  submitButton={submitButton}
                  setFormState={setFormState}
                  itemId={itemId}
                ></ItemForm>
              );
            }}
          </FormContainerPage>
        </PrivateRoute>
        <PrivateRoute LoggedIn={props.loggedIn} exact path="/Order">
          <FormContainerPage objective={"Order creation"}>
            {(submitButton, setFormState) => {
              return (
                <OrderForm
                  onSubmit={handleOrderCreate}
                  submitButton={submitButton}
                  setFormState={setFormState}
                  user={props.user}
                ></OrderForm>
              );
            }}
          </FormContainerPage>
        </PrivateRoute>
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

const mapStateToProps = function (state) {
  console.log(state);
  return {
    user: state.user,
    loggedIn: state.loggedIn,
    items: state.items,
    searchRequest: state.searchRequest,
    formState: state.formState,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    makeRequest: (request, action, params) => {
      dispatch(makeRequest(request, action, params));
    },
    setFormState: (status) => {
      dispatch(changeFormStatus(status));
    },
    setSearchRequest: (request) => {
      dispatch(changeSearchRequest(request));
    },
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
