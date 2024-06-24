import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Resource from './resource';
import ResourceDetail from './resource-detail';
import ResourceUpdate from './resource-update';
import ResourceDeleteDialog from './resource-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ResourceDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ResourceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ResourceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ResourceDetail} />
      <ErrorBoundaryRoute path={match.url} component={Resource} />
    </Switch>
  </>
);

export default Routes;
