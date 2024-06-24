import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SupplyPointResource from './supply-point-resource';
import SupplyPointResourceDetail from './supply-point-resource-detail';
import SupplyPointResourceUpdate from './supply-point-resource-update';
import SupplyPointResourceDeleteDialog from './supply-point-resource-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SupplyPointResourceDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SupplyPointResourceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SupplyPointResourceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SupplyPointResourceDetail} />
      <ErrorBoundaryRoute path={match.url} component={SupplyPointResource} />
    </Switch>
  </>
);

export default Routes;
