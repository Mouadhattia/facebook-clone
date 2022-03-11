
import React from "react";
import { Route, Redirect } from "react-router-dom";




export default function PrivateRoute({ component: Component, ...rest },{user}) {
  const isAuth = true

  if (isAuth) {
    return <Route component={Component} {...rest} />;
  } else  {
    return <Redirect to="/login" />;
  }
}
