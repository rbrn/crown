import './home.scss';

import React from 'react';
import {connect} from 'react-redux';

import Map from '../map/map';

import LandingPage from './LandingPage';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;
  return (
    <Map />
    // <LandingPage />
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
