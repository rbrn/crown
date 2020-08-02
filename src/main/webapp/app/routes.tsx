import React from 'react'
import { Switch } from 'react-router-dom'
import Loadable from 'react-loadable'

import Login from 'app/modules/login/login'
import InventorySupply from 'app/modules/inventory/inventory_supply'
import InventoryBuy from 'app/modules/inventory/inventory_buy'
import BuyerJourney from 'app/modules/buyer_seller_journey/buyer_journey'
import SellerJourney from 'app/modules/buyer_seller_journey/seller_journey'
import BuyerLanding from 'app/modules/buyer_seller_journey/buyer_landing'
import SellerLanding from 'app/modules/buyer_seller_journey/seller_landing'
import Welcome from 'app/modules/home/welcome'
import WholeSalerSearch from 'app/modules/search/wholesaler-search'
import Register from 'app/modules/account/register/register'
import Activate from 'app/modules/account/activate/activate'
import PasswordResetInit from 'app/modules/account/password-reset/init/password-reset-init'
import PasswordResetFinish from 'app/modules/account/password-reset/finish/password-reset-finish'
import Logout from 'app/modules/login/logout'
import Home from 'app/modules/home/home'
import Entities from 'app/entities'
import PrivateRoute from 'app/shared/auth/private-route'
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route'
import PageNotFound from 'app/shared/error/page-not-found'
import { AUTHORITIES } from 'app/config/constants'
import Support from 'app/modules/home/support'
import About from 'app/modules/home/about'
import PolicyAndTerms from 'app/modules/home/policyAndTerms'
import UploadDocuments from 'app/entities/supplier-resource/buyer-seller-document-component'
import LandingPage from './modules/home/LandingPage'

const Account = Loadable({
  loader: () => import(/* webpackChunkName: "account" */ 'app/modules/account'),
  loading: () => <div>loading ...</div>
})

const Admin = Loadable({
  loader: () => import(/* webpackChunkName: "administration" */ 'app/modules/administration'),
  loading: () => <div>loading ...</div>
})

const Routes = () => (
  <div className='view-routes'>
    <Switch>
      <ErrorBoundaryRoute path='/search' component={WholeSalerSearch} />
      <ErrorBoundaryRoute path='/welcome' component={Welcome} />
      <ErrorBoundaryRoute path='/landing' component={LandingPage} />
      <ErrorBoundaryRoute path='/doc' component={UploadDocuments} />
      <ErrorBoundaryRoute path='/support' component={Support} />
      <ErrorBoundaryRoute path='/about' component={About} />
      <ErrorBoundaryRoute path='/policy' component={PolicyAndTerms} />
      <ErrorBoundaryRoute path='/login' component={Login} />
      <ErrorBoundaryRoute path='/inventory-supply' component={InventorySupply} />
      <ErrorBoundaryRoute path='/inventory-buy' component={InventoryBuy} />
      <ErrorBoundaryRoute path='/buyer-journey' component={BuyerJourney} />
      <ErrorBoundaryRoute path='/seller-journey' component={SellerJourney} />
      <ErrorBoundaryRoute path='/buyer-landing' component={BuyerLanding} />
      <ErrorBoundaryRoute path='/seller-landing' component={SellerLanding} />
      <ErrorBoundaryRoute path='/logout' component={Logout} />
      <ErrorBoundaryRoute path='/account/register' component={Register} />
      <ErrorBoundaryRoute path='/account/activate/:key?' component={Activate} />
      <ErrorBoundaryRoute path='/account/reset/request' component={PasswordResetInit} />
      <ErrorBoundaryRoute path='/account/reset/finish/:key?' component={PasswordResetFinish} />
      <PrivateRoute path='/admin' component={Admin} hasAnyAuthorities={[AUTHORITIES.ADMIN]} />
      <PrivateRoute path='/account' component={Account} hasAnyAuthorities={[AUTHORITIES.ADMIN, AUTHORITIES.USER]} />
      <ErrorBoundaryRoute path='/' exact component={Home} />
      <PrivateRoute path='/' component={Entities} hasAnyAuthorities={[AUTHORITIES.USER]} />
      <ErrorBoundaryRoute component={PageNotFound} />
    </Switch>
  </div>
)

export default Routes
