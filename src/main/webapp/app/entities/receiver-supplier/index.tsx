import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ReceiverSupplier from './receiver-supplier';
import ReceiverSupplierDetail from './receiver-supplier-detail';
import ReceiverSupplierUpdate from './receiver-supplier-update';
import ReceiverSupplierDeleteDialog from './receiver-supplier-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ReceiverSupplierDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ReceiverSupplierUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ReceiverSupplierUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ReceiverSupplierDetail} />
      <ErrorBoundaryRoute path={match.url} component={ReceiverSupplier} />
    </Switch>
  </>
);

export default Routes;
