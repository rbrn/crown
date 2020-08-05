import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ReceiverResource from './receiver-resource';
import ReceiverResourceDetail from './receiver-resource-detail';
import ReceiverResourceUpdate from './receiver-resource-update';
import ReceiverResourceDeleteDialog from './receiver-resource-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ReceiverResourceDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ReceiverResourceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ReceiverResourceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ReceiverResourceDetail} />
      <ErrorBoundaryRoute path={match.url} component={ReceiverResource} />
    </Switch>
  </>
);

export default Routes;
