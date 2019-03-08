import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router'
//
import App from 'pages/App';
import HomePage from 'pages/HomePage/Loadable';
import ApplicationPage from 'pages/ApplicationPage/Loadable';
import NotFoundPage from 'pages/NotFoundPage/Loadable';
import { history } from './store';
import { ROUTES } from './config/constants';
import AdminPanelPage from "./pages/AdminPanelPage";

export const routes = (
  <ConnectedRouter history={history}>
    <Switch>
      <Route
        exact
        path={ROUTES.HOME}
        render={(props) => (
          <App>
            <HomePage {...props} />
          </App>
        )}
      />
      <Route
        exact
        path={ROUTES.APPLICATION}
        render={(props) => (
          <App>
            <ApplicationPage {...props} />
          </App>
        )}
      />
      <Route
        exact
        path={ROUTES.ADMIN_PANEL}
        render={(props) => (
          <App>
            <AdminPanelPage {...props} />
          </App>
        )}
      />
      <Route
        render={(props) => (
          <App>
            <NotFoundPage {...props} />
          </App>
        )}
      />
    </Switch>
  </ConnectedRouter>
);

export default routes;
