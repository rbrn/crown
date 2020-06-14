import './welcome.scss';

import React from 'react';
import {Button, Card, Col, Row} from 'reactstrap';

const PolicyAndTerms = props => (
  <div className="policy-terms padding-all-15" data-name="policy-terms">
    <Row>
      <Col className=".col-sm-12 .col-md-6 .offset-md-3">
        <h2>
          Policy and terms page
        </h2>
      </Col>
    </Row>
  </div>
);

export default PolicyAndTerms;
