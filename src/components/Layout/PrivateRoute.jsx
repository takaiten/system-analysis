import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import * as ROUTES from '../../routes';

const PrivateRoute = ({ component: Component, isAuthenticated, to, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (!isAuthenticated ? <Component {...props} /> : <Redirect to={to || ROUTES.MAIN} />)}
    />
  );
};

export { PrivateRoute };
