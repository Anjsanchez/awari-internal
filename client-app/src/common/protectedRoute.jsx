import React from "react";
import { Route, Redirect } from "react-router-dom";
import { store } from "../utils/store/configureStore";

const ProtectedRoute = ({
  path,
  component: Component,
  keyId,
  render,
  ...rest
}) => {
  const { isLoggedIn, user } = store.getState().entities.user;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isLoggedIn)
          return (
            <Redirect
              to={{
                pathname: "/a/login",
                state: { from: props.location },
              }}
            />
          );

        const hasAccess = user.userRoles.filter(
          (e) => e.roleKey === Math.trunc(keyId)
        );

        if (hasAccess.length === 0) {
          if (keyId === "1")
            return (
              <Redirect
                to={{
                  pathname: "/a/commerce-management/shop",
                  state: { from: props.location },
                }}
              />
            );

          return (
            <Redirect
              to={{
                pathname: "/no-access",
                state: { from: props.location },
              }}
            />
          );
        }

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
