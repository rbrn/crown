import React from 'react';
import {Card, Col, Row } from 'reactstrap';

import ItemSearchSelection from './item-dropdown';
import SearchRegionSelection from './region-dropdown';
import SearchCountrySelection from './country-dropdown';

import 'leaflet';
import 'leaflet/dist/leaflet.css';


const WholeSalerSearch = props => (
  <div className="SearchPage" style={{ height: '90vh', marginTop: '20px', marginLeft: '20px' }}>
    <div className="Search-Row">

      <Row>
        <Col style={{textAlign: 'center', fontSize: '30px'}}>
          <b>Search Results In Your Country, Refine Your Search:</b>
        </Col>
      </Row>

      <Row className="p-3">

        <Col className="item-search" style={{ display: 'flex'}}>
          <b style={{marginRight: '2rem'}}> Items </b>
          <ItemSearchSelection />
        </Col>

        <Col className="country-search" style={{ display: 'flex'}}>
          <b style={{ marginRight: '2rem' }}> Country </b>
          <SearchCountrySelection />
        </Col>

        <Col className="region-search" style={{ display: 'flex'}}>
          <b style={{ marginRight: '2rem' }}> Region </b>
          <SearchRegionSelection />
        </Col>

      </Row>

    </div>

    <Card style={{ position: 'fixed', left: '400px', backgroundColor: 'lightgrey', height: '500px', width: '1000px', alignItems: 'center' }}>
      MAP Goes HERE!!!!
    </Card>

    <div className='location'>
      <img src="content/images/location.png"/>
      <h1 style={{ marginTop: '15px', fontSize: '20px' }}> You are at:  </h1>
      <p>The address placement!!!!!</p>
    </div>

    <div style={{ position: 'absolute', top: '330px' }}>

      <b style={{ fontSize: '20px', marginTop: '10px' }}> Current Status Scale </b>
      <Row className='p-3'>
        <Col className='col-lg-1'>
          <img src='content/images/green.png' />
        </Col>
        <Col style={{marginLeft:'40px', alignItems:'center'}}>
          <div>No Demand</div>
        </Col>
      </Row>

      <Row className='p-3'>
        <Col className='col-lg-1'>
          <img src='content/images/yellow.png' />
        </Col>
        <Col style={{ marginLeft: '40px', alignItems: 'center' }}>
          <div>Predicted Scarcity</div>
        </Col>
      </Row>

      <Row className='p-3'>
        <Col className='col-lg-1'>
          <img src='content/images/red.png' />
        </Col>
        <Col style={{ marginLeft: '40px', alignItems: 'center' }}>
          <div>High Demand</div>
        </Col>
      </Row>

    </div>

  </div>
  );

export default WholeSalerSearch;
