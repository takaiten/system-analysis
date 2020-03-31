import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getLoggedState } from './redux/ducks/auth/selectors';
import { PrivateRoute, RegisterPage, WelcomePage } from './components';
import * as ROUTES from './routes';

export default function App() {
  const logged = useSelector(getLoggedState);

  return (
    <Switch>
      <PrivateRoute exact from={ROUTES.WELCOME} to={ROUTES.MAIN} isAuthenticated={!logged}>
        <WelcomePage />
      </PrivateRoute>
      <PrivateRoute exact from={ROUTES.REGISTER} to={ROUTES.MAIN} isAuthenticated={!logged}>
        <RegisterPage />
      </PrivateRoute>
      <PrivateRoute exact from={ROUTES.MAIN} to={ROUTES.WELCOME} isAuthenticated={logged}>
        <h1>TODO: Create main page for expert and analyst</h1>
      </PrivateRoute>
      <Redirect from={ROUTES.ROOT} to={ROUTES.WELCOME} />
    </Switch>
  );
}
