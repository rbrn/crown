import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ResourceType from './resource-type';
import ResourceTypeDetail from './resource-type-detail';
import ResourceTypeUpdate from './resource-type-update';
import ResourceTypeDeleteDialog from './resource-type-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ResourceTypeDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ResourceTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ResourceTypeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ResourceTypeDetail} />
      <ErrorBoundaryRoute path={match.url} component={ResourceType} />
    </Switch>
  </>
);

export default Routes;
