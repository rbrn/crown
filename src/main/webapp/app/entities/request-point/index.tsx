import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import RequestPoint from './request-point';
import RequestPointDetail from './request-point-detail';
import RequestPointUpdate from './request-point-update';
import RequestPointDeleteDialog from './request-point-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={RequestPointDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RequestPointUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RequestPointUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RequestPointDetail} />
      <ErrorBoundaryRoute path={match.url} component={RequestPoint} />
    </Switch>
  </>
);

export default Routes;
