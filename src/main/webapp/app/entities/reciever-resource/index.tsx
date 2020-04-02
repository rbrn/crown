import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import RecieverResource from './reciever-resource';
import RecieverResourceDetail from './reciever-resource-detail';
import RecieverResourceUpdate from './reciever-resource-update';
import RecieverResourceDeleteDialog from './reciever-resource-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={RecieverResourceDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={RecieverResourceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={RecieverResourceUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={RecieverResourceDetail} />
      <ErrorBoundaryRoute path={match.url} component={RecieverResource} />
    </Switch>
  </>
);

export default Routes;
