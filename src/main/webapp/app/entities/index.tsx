import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import SupplyPoint from './supply-point';
import Resource from './resource';
import SupplyPointResource from './supply-point-resource';
import Delivery from './delivery';
import RequestPoint from './request-point';
import Request from './request';
import ReceiverSupplier from './receiver-supplier';
import ReceiverResource from './receiver-resource';
import SupplierResource from './supplier-resource';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}supply-point`} component={SupplyPoint} />
      <ErrorBoundaryRoute path={`${match.url}resource`} component={Resource} />
      <ErrorBoundaryRoute path={`${match.url}supply-point-resource`} component={SupplyPointResource} />
      <ErrorBoundaryRoute path={`${match.url}delivery`} component={Delivery} />
      <ErrorBoundaryRoute path={`${match.url}request-point`} component={RequestPoint} />
      <ErrorBoundaryRoute path={`${match.url}request`} component={Request} />
      <ErrorBoundaryRoute path={`${match.url}receiver-supplier`} component={ReceiverSupplier} />
      <ErrorBoundaryRoute path={`${match.url}receiver-resource`} component={ReceiverResource} />
      <ErrorBoundaryRoute path={`${match.url}supplier-resource`} component={SupplierResource} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
