import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export const ProtectedRoute = ({ component: Component, users,...rest }) => {
  const state = useSelector((state) => ({
    token: state.loginUser.token,
    role: state.loginUser.role
  }));
  
  return (
    <Route
      {...rest}
      render={(props) => {
        if (users.includes(state.role)) {
          return <Component {...rest} {...props}/>;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};
