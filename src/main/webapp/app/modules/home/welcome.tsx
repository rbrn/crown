import './welcome.scss';

import React from 'react';
import {Button, Card, Col, Row} from 'reactstrap';

const Welcome = props => (
  <div className="welcome">
    <div className="welcome-container">
      <Row>
        <Col className=".col-sm-12 .col-md-6 .offset-md-3">
          <div>
            <img src="content/images/welcome-logo.png" style={{height:'120px',width:'300px', marginBottom: '30px'}} alt="Logo" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col className=".col-md-3 .offset-md-3">
          <Card className="welcome-card">
            <div className=''>
              <Button onClick={() => 'Browse Available'} className='w-100 mb-2 cw-btn'>Wholesaler</Button>
              <Button onClick={() => 'Request Medical Supplies'} className='w-100 mb-2 cw-btn'>Inventory Specialist</Button>
            </div>
          </Card>
        </Col>
        <Col className=".col-md-3 .offset-md-1">
          <Card className="welcome-card">
            <h6>I want to</h6>
            <div className=''>
              <Button onClick={() => 'Browse Available'} className='w-100 mb-2 cw-btn'>place an order</Button>
              <Button onClick={() => 'Request Medical Supplies'} className='w-100 mb-2 cw-btn'>check the demand</Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
);

export default Welcome;
