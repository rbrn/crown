import './welcome.scss';

import React from 'react';
import {Button, Card, Col, Row} from 'reactstrap';

const About = props => (
  <div className="about padding-all-15" data-name="about">
      <Row>
        <Col className=".col-sm-12 .col-md-6 .offset-md-3">
          <h2>
            About page
          </h2>
        </Col>
      </Row>
  </div>
);

export default About;
