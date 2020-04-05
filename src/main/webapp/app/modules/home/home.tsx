import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';
import { Translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import Map from '../map/map';

export type IHomeProp = StateProps;

export const Home = (props: IHomeProp) => {
  const { account } = props;
  if (!(account && account.login)) {
    return (
      <div>
        <Alert color="warning">
          <Translate contentKey="global.messages.info.authenticated.prefix">If you want to </Translate>
          <Link to="/login" className="alert-link">
            <Translate contentKey="global.messages.info.authenticated.link"> sign in</Translate>
          </Link>
          <Translate contentKey="global.messages.info.authenticated.suffix">
            , you can try the default accounts:
            <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
            <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
          </Translate>
        </Alert>

        <Alert color="warning">
          <Translate contentKey="global.messages.info.register.noaccount">You do not have an account yet?</Translate>&nbsp;
          <Link to="/account/register" className="alert-link">
            <Translate contentKey="global.messages.info.register.link">Register a new account</Translate>
          </Link>
        </Alert>
      </div>
    )
  }
  return (
    <Map />
  );
};

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Home);
