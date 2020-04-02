import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import RecieverSupplier from './reciever-supplier';
import RecieverSupplierDetail from './reciever-supplier-detail';
import RecieverSupplierUpdate from './reciever-supplier-update';
import RecieverSupplierDeleteDialog from './reciever-supplier-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={RecieverSupplierDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RecieverSupplierUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RecieverSupplierUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RecieverSupplierDetail} />
      <ErrorBoundaryRoute path={match.url} component={RecieverSupplier} />
    </Switch>
  </>
);

export default Routes;
