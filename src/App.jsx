import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getLoggedState, getUserRole } from './redux/ducks/auth/selectors';
import {
  AssignedTask,
  LoginPage,
  MainPageAnalyst,
  MainPageExpert,
  PrivateRoute,
  RegisterPage,
  WelcomePage,
} from './components';
import { ResultsPage } from './components/ResultsPage/ResultsPage';
import * as ROUTES from './routes';
import { expert } from './helpers/consts';

export default () => {
  const logged = useSelector(getLoggedState);
  const role = useSelector(getUserRole);

  return (
    <Switch>
      <PrivateRoute
        exact
        from={ROUTES.WELCOME}
        to={ROUTES.MAIN}
        isAuthenticated={!logged}
        component={WelcomePage}
      />
      <PrivateRoute
        exact
        from={ROUTES.REGISTER}
        to={ROUTES.MAIN}
        isAuthenticated={!logged}
        component={RegisterPage}
      />
      <PrivateRoute
        exact
        from={ROUTES.LOGIN}
        to={ROUTES.MAIN}
        isAuthenticated={!logged}
        component={LoginPage}
      />
      <PrivateRoute
        exact
        from={ROUTES.VIEW_TASK}
        to={ROUTES.MAIN}
        isAuthenticated={logged}
        component={AssignedTask}
      />
      <PrivateRoute
        exact
        from={ROUTES.SHOW_USERS_RESULTS}
        to={ROUTES.MAIN}
        isAuthenticated={logged}
        component={ResultsPage}
      />
      <PrivateRoute
        exact
        from={ROUTES.MAIN}
        to={ROUTES.WELCOME}
        isAuthenticated={logged}
        component={role === expert ? MainPageExpert : MainPageAnalyst}
      />
      <Redirect from={ROUTES.ROOT} to={ROUTES.WELCOME} />
    </Switch>
  );
};
