import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';

export type LatLng = {
  lat: number,
  lng: number,
};
type State = {
  open: boolean,
  showOptions: boolean,
  latlng: LatLng,
  type: string,
  radius: number,
  aroundMeSuppliers: any,
  aroundMeReceivers: any,
  resourceSuppliersMap: {}
  currentLocation: string
};

type Map = {
  on: Function,
  removeLayer: Function,
  addControl: Function,
  fitBounds: Function,
  setView: Function
}

// change this after user is tagged with geo location
const defaultLatLng = {
  lat: 51.505,
  lng: -0.09,
};
const types = {
  'Browse Available': 'Browse Available',
  'Browse Requested': 'Browse Requested',
  'Request Medical Supplies': 'Request Medical Supplies',
  'Supply Medical Supplies': 'Supply Medical Supplies',
};

const SupplTypes = {
  'Browse Requested': 'Browse Requested',
  'Supply Medical Supplies': 'Supply Medical Supplies',
};

const RequestTypes = {
  'Browse Available': 'Browse Available',
  'Request Medical Supplies': 'Request Medical Supplies',

};

let position = [51.505, -0.09];


class BuyerJourney extends React.Component<State> {

  private resourceSuppliersMap: Map;
  circle = {};

  state = {
    open: false,
    latlng: defaultLatLng,
    showOptions: true,
    type: types['Browse Available'],
    radius: 10,
    aroundMeSuppliers: [],
    aroundMeReceivers: [],
    resourceSuppliersMap: {},
    currentLocation: ''
  };

  // latlng no longer defaults to London
  // after closing the pop-ups
  closeModal = () => {
    this.setState({
      open: false,
      latlng: this.state.latlng, // Changed from defaultLatLng
      type: types['Browse Available'],
    })
  }


  componentDidMount() {
    // use this.props.account to set view after the geo location of user is obtained


    // check for Geolocation support
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((pos) => {
        position = [pos.coords.latitude, pos.coords.longitude]
        this.onClientPositionIdentified(position);
      }, (error) => {
        alert("Problem getting geolocation " + error.message);
        /**
         * Add a different strategy for identifying users
         */
        position = [this.state.latlng.lat, this.state.latlng.lng]

      })
    } else {
      alert('Geolocation is not supported for this Browser/OS.');
      position = [this.state.latlng.lat, this.state.latlng.lng]
    }
  }

  private onClientPositionIdentified(pos) {

    const browserLatLng = {
      lat: position[0],
      lng: position[1],
    };

    this.setState({
      latlng: browserLatLng,
      resourceSuppliersMap: this.resourceSuppliersMap
    });

    // This can be used to display user's current location if available
    // const geocoder = L.Control.Geocoder.nominatim();
    // geocoder.reverse(browserLatLng, 10, this.setCurrentLocation);
  }

  setCurrentLocation = (results) => {
    this.setState(
      {
        currentLocation: results[0].name
      }
    )
  }

  onButtonClicked = (type) => {
    this.setState({
      open: true,
      type,
    })
  }

  render() {
    const offerPPEparam = "/supplier-resource/new?lat=" + this.state.latlng.lat + "&lng=" + this.state.latlng.lng + "&typePPE=supply";
    const requestPPEparam = "/receiver-resource/new?lat=" + this.state.latlng.lat + "&lng=" + this.state.latlng.lng + "&typePPE=request";

    if (this.state.type === types['Request Medical Supplies'])
      return <Redirect to={requestPPEparam} />
    else if (this.state.type === types['Supply Medical Supplies']) {
      return <Redirect to={offerPPEparam} />
    }

    const titleText = {
      color: '#707070',
      letterSpacing: '0px',
      font: 'Bold 30px/45px Montserrat'
    };
    const outerBoxStyles = {
      padding: '10px',
      border: '7px solid #4698DC',
      opacity: '1',
      width: '50px'
    };

    const innerTopBox = {
      backgroundColor: '#4698DC',
      opacity: '1',
      height: '40px',
      width: '40px',
      borderRadius: '7px',
      marginLeft: 'auto',
      marginRight: 'auto'
    };

    const innerTopBoxText = {
      color: '#fff',
      textAlign: 'center' as const,
      paddingTop: '8px'
    };

    const innerParagraph = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    };

    const innerParagraphText = {
      textAlign: 'center' as const
    };

    const innerBottomBox = {
      position: 'absolute' as const,
      backgroundColor: '#5C4A56',
      padding: '10px',
      opacity: '1',
      borderRadius: '7px',
      left: '35px',
      width: '180px',
      height: '38px',
      top: '212px'
    };

    const innerBottomBoxText = {
      marginBottom: '-5px',
      opacity: '1',
      color: '#fff',
      textAlign: 'center' as const,
      justifyItems: 'center',
      font: 'Bold 15px/20px Montserrat'
    };

    return (
      <div style={{ backgroundImage: `url('../../../content/images/background.png')` }}>
        <br />
        <br />
        <br />
        <br />
        <Row>
          <Col span={24} style={{ textAlign: 'center' }}>
            <h5 style={titleText}>Get ready to supply</h5>
          </Col>
        </Row>
        <br />
        <br />
        <div>
          <Row>
            <Col span={4}></Col>
            <Col span={4} style={outerBoxStyles} className="shadow p-3 mb-5 bg-blue rounded">
              <p style={innerTopBox}>
                <h6 style={innerTopBoxText}>1</h6>
              </p>
              <br />
              <p style={innerParagraph}>
                <span style={innerParagraphText}>Check requested medical supplies on map and offer to supply the medical supplies</span>
              </p>
              <br />
              <Link to="/seller-landing">
                <p style={innerBottomBox}>
                  <h6 style={innerBottomBoxText}>CURRENT DEMAND</h6>
                </p>
              </Link>
            </Col>
            <Col span={2}></Col>
            <Col span={4} style={outerBoxStyles} className="shadow p-3 mb-5 bg-blue rounded">
              <p style={innerTopBox}>
                <h5 style={innerTopBoxText}>2</h5>
              </p>
              <br />
              <p style={innerParagraph}>
                <span style={innerParagraphText}>
                  Have medical supplies and looking for a potential buyer? Click here to list your medical supplies
                </span>
              </p>
              <br />
              <Link to={offerPPEparam}>
              <p style={innerBottomBox}>
                <h5 style={innerBottomBoxText}>LIST SUPPLIES</h5>
              </p>
              </Link>
            </Col>
            <Col span={2}></Col>
            <Col span={4} style={outerBoxStyles} className="shadow p-3 mb-5 bg-blue rounded">
              <p style={innerTopBox}>
                <h5 style={innerTopBoxText}>3</h5>
              </p>
              <br />
              <p style={innerParagraph}>
                <span style={innerParagraphText}>Arriving in the near future</span>
              </p>
              <br />
              <p style={innerBottomBox}>
                <h5 style={innerBottomBoxText}>FUTURE DEMAND</h5>
              </p>
            </Col>
            <Col span={4}></Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default BuyerJourney;
