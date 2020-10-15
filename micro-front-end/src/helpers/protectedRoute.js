import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

export const ProtectedRoute = ({ component: Component, users,...rest }) => {
  const state = useSelector((state) => ({
    token: state.loginUser.token,
  }));
  
  let role = "guest";
  try {
    var decoded = jwt_decode(state.token);
    role = decoded.role;
  } catch {
    role = "guest";
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        if (users.includes(role)) {
          return <Component {...rest} {...props}/>;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/auth",
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
