import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRoute({ children, LoggedIn, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return LoggedIn ? children : <Redirect to={"/SignIn"} />;
      }}
    />
  );
}
