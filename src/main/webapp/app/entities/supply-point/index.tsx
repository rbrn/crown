import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SupplyPoint from './supply-point';
import SupplyPointDetail from './supply-point-detail';
import SupplyPointUpdate from './supply-point-update';
import SupplyPointDeleteDialog from './supply-point-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SupplyPointDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SupplyPointUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SupplyPointUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SupplyPointDetail} />
      <ErrorBoundaryRoute path={match.url} component={SupplyPoint} />
    </Switch>
  </>
);

export default Routes;
