import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SupplierResource from './supplier-resource';
import SupplierResourceDetail from './supplier-resource-detail';
import SupplierResourceUpdate from './supplier-resource-update';
import SupplierResourceDeleteDialog from './supplier-resource-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={SupplierResourceDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={SupplierResourceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={SupplierResourceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={SupplierResourceDetail} />
      <ErrorBoundaryRoute path={match.url} component={SupplierResource} />
    </Switch>
  </>
);

export default Routes;
