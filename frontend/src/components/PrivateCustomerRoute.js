import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function PrivateRoute({ component: Component, ...rest }) {
  const customerSignin = useSelector((state) => state.customerSignin);
  const { customerInfo } = customerSignin;
  return (
    <Route
      {...rest}
      render={(props) =>
        customerInfo ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/signin" />
        )
      }
    ></Route>
  );
}