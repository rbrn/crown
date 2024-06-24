import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Claim from './claim';
import ClaimDetail from './claim-detail';
import ClaimUpdate from './claim-update';
import ClaimRequest from './claim-request';
import ClaimDeleteDialog from './claim-delete-dialog';
import ClaimRequestByReceiverRequest from './claim-create-receiver-request';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ClaimDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ClaimUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/request/by-receiver-resourceId`} component={ClaimRequestByReceiverRequest} />
      <ErrorBoundaryRoute exact path={`${match.url}/request/by-suppler-resourceId`} component={ClaimRequest} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ClaimUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ClaimDetail} />
      <ErrorBoundaryRoute path={match.url} component={Claim} />
    </Switch>
  </>
);

export default Routes;
