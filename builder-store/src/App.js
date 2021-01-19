import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./utils/components/PrivateRoute";

import Items from "./components/Items/Items";
import Navigation from "./components/Navigation/Navigation";
import SignInForm from "./components/Forms/AuthForms/SignInForm";
import SignUpForm from "./components/Forms/AuthForms/SignUpForm";
import ItemForm from "./components/Forms/ItemForms/ItemForm";
import OrderForm from "./components/Forms/OrderForms/OrderForm";
import FormContainerPage from "./components/Forms/FormContainerPage";
import NotFound from "./utils/components/NotFound";

import { SignIn, SignUp } from "./API/Auth";
import { createItem, updateItem, deleteItem, getItems } from "./API/Items";
import { createOrder } from "./API/Order";
import { partial, getFormData, requestHandler } from "./utils/helpers";

function App(props) {
  const [LoggedIn, setLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [itemsLoadingError, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [searchRequest, setSearchRequest] = useState("");

  useEffect(() => {
    getItems().then(
      (result) => {
        setItems(result.data);
        setIsLoaded(true);
      },
      (error) => {
        setError(error);
      }
    );
  }, []);

  const onLogout = () => {
    setLoggedIn(false);
    setUser(null);
  };

  const authHandler = (authRequest, e, setFormState) => {
    let data = getFormData(e);
    requestHandler(authRequest, setFormState, data)
      .then((result) => {
        setUser(result);
        setLoggedIn(true);
      })
      .catch((error) => {
        setFormState("error");
      });
  };
  const handleSignIn = partial(authHandler, SignIn);
  const handleSignUp = partial(authHandler, SignUp);

  const handleSearch = (e) => {
    const search = getFormData(e).request.toLowerCase();
    setSearchRequest(search);
  };

  const handleItemCreate = (e, setFormState) => {
    let data = getFormData(e);
    requestHandler(createItem, setFormState, {
      Bearer: `Bearer ${user.token}`,
      data,
    })
      .then((result) => {
        setItems((prevState) => [...prevState, result.data]);
        e.target.reset();
      })
      .catch((error) => {
        console.log(error);
        setFormState("error");
      });
  };

  const handleItemBuy = (item) => {
    let order = JSON.parse(localStorage.getItem("order")) || [];
    const index = order.findIndex((product) => {
      return product.item === item._id;
    });
    index !== -1
      ? order[index].count++
      : order.push({ title: item.name, item: item._id, count: 1 });
    localStorage.setItem("order", JSON.stringify(order));
  };

  const handleItemUpdate = (e, setFormState, id) => {
    let data = getFormData(e);
    requestHandler(updateItem, setFormState, {
      Bearer: `Bearer ${user.token}`,
      data,
      id,
    })
      .then((result) => {
        setItems(
          items.map((item) => {
            if (item._id === id) return result.data;
            else return item;
          })
        );
      })
      .catch((error) => {
        console.log(error);
        setFormState("error");
      });
  };
  const handleItemDelete = (id) => {
    requestHandler(deleteItem, setIsLoaded, {
      Bearer: `Bearer ${user.token}`,
      id,
    })
      .then((result) => {
        setItems(
          items.filter((item) => {
            return item._id !== id;
          })
        );
      })
      .catch((error) => {
        console.log(error);
        alert("error");
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
        Bearer: `Bearer ${user.token}`,
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

  return (
    <>
      <Router>
        <Navigation
          handleSearch={handleSearch}
          onLogout={onLogout}
          LoggedIn={LoggedIn}
          user={user}
        ></Navigation>
        <Switch>
          <Route exact path="/">
            <Container className="Container">
              <Items
                Items={items}
                isLoaded={isLoaded}
                Error={itemsLoadingError}
                searchRequest={searchRequest}
                LoggedIn={LoggedIn}
                user={user}
                handleItemBuy={handleItemBuy}
                handleItemDelete={handleItemDelete}
                handleItemUpdate={handleItemUpdate}
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
          <PrivateRoute LoggedIn={LoggedIn} exact path="/CreateItem">
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
          <PrivateRoute LoggedIn={LoggedIn} exact path="/EditItem/:id">
            <FormContainerPage
              reddirectComponent={<Redirect to="/" />}
              objective={"Item editing"}
            >
              {(submitButton, setFormState, itemId) => {
                return (
                  <ItemForm
                    onSubmit={handleItemUpdate}
                    items={items}
                    submitButton={submitButton}
                    setFormState={setFormState}
                    itemId={itemId}
                  ></ItemForm>
                );
              }}
            </FormContainerPage>
          </PrivateRoute>
          <PrivateRoute LoggedIn={LoggedIn} exact path="/Order">
            <FormContainerPage objective={"Order creation"}>
              {(submitButton, setFormState) => {
                return (
                  <OrderForm
                    onSubmit={handleOrderCreate}
                    submitButton={submitButton}
                    setFormState={setFormState}
                  ></OrderForm>
                );
              }}
            </FormContainerPage>
          </PrivateRoute>
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
