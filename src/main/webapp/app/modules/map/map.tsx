/* eslint-disable no-console */
import './map.scss';

import React from 'react';
import {connect} from 'react-redux';
import {Col, Row, Container} from 'reactstrap';
import Popup from "reactjs-popup";

import PostedItemsComponent from './posteditems';

import TopPanel from './toppanel';
import LeftPanel from './leftpanel';
import 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.css';
import {Redirect} from "react-router-dom";
import RequestedItemsComponent from "app/modules/map/requestedItems";
import axios from "axios";
import config from "app/modules/map/apiConfig.json";

import CookieConsent from "react-cookie-consent";

declare global {
  interface Window {
    L: any;
  }
}

const {L} = window;

delete L.Icon.Default.prototype._getIconUrl;

/* L.Icon.Default.mergeOptions({
  iconRetinaUrl: "content/images/marker-icon-2x.png",
  iconUrl: "content/images/marker-icon.png",
  shadowUrl: "content/images/marker-shadow.png",
}); */

const myIcon = L.divIcon({
  className: 'location-pin',
  html: '<center><h1>1</h1></center><div class="pin"></div><div class="pulse"></div>',
  iconSize: [30, 30],
  iconAnchor: [10, 33]
});

L.Icon.Default.imagePath = '';
L.Marker.prototype.options.icon = myIcon;

export interface MapProps extends StateProps, DispatchProps {
}


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
const LeafIcon = L.Icon.extend({
  options: {
    iconSize: [25, 65]
  }
});

const supplierIcon = new LeafIcon({iconUrl: '../../../content/images/supplies-svgrepo-com.svg'});
const requesterIcon = new LeafIcon({
  iconSize: [25, 35],
  iconUrl: '../../../content/images/iconfinder_hospital_5932161.png'
});


let position = [51.505, -0.09];

let currentMarker = undefined;

// const map = L.map('map-container').setView([51.505, -0.09], 13);

// const pane = map.createPane('fixed', document.getElementById('map-container'));

class MapComponent extends React.Component<MapProps, State> {
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


  changeRadius = (value) => {
    this.setState({
      radius: value
    }, this.updateCircle)
  }

  // latlng no longer defaults to London
  // after closing the pop-ups
  closeModal = () => {
    this.setState({
      open: false,
      latlng: this.state.latlng, // Changed from defaultLatLng
      type: types['Browse Available'],
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.latlng !== prevState.latlng)
      this.loadMarkersAroundMe()
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

        this.resourceSuppliersMap = L.map('map-container').setView(position, 10);
        this.resourceSuppliersMap.on('click', (event) => this.onMapClicked(event));
        this.setTitleLayer();

      })
    } else {
      alert('Geolocation is not supported for this Browser/OS.');
      position = [this.state.latlng.lat, this.state.latlng.lng]

      this.resourceSuppliersMap = L.map('map-container').setView(position, 10);
      this.resourceSuppliersMap.on('click', (event) => this.onMapClicked(event));
      this.setTitleLayer();
    }
  }

  private onClientPositionIdentified(pos) {
    this.resourceSuppliersMap = L.map('map-container').setView(pos, 10);
    this.resourceSuppliersMap.on('click', (event) => this.onMapClicked(event));

    this.setTitleLayer();
    const browserLatLng = {
      lat: position[0],
      lng: position[1],
    };

    this.circle = L.circle(browserLatLng, this.state.radius * 1000).addTo(this.resourceSuppliersMap);
    this.setState({
      latlng: browserLatLng,
      resourceSuppliersMap: this.resourceSuppliersMap
    });

    currentMarker = new L.Marker(browserLatLng).addTo(this.resourceSuppliersMap);
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
    console.log(type);
    this.setState({
      open: true,
      type,
    })
  }

  removeCircle = () => {
    this.resourceSuppliersMap.removeLayer(this.circle)
    this.resourceSuppliersMap.removeLayer(currentMarker)
  }

  /**
   * Load the available requests/offers on a distance of 300 km
   */
  private loadMarkersAroundMe() {

    axios.get(`${config.getSupplierGetAroundMeUri}?distance=300&page=0&size=1000&units=km&x=${position[0]}&y=${position[1]}`)
      .then(({data}) => {
        this.setState({
          aroundMeSuppliers: data,
        });
      })


    axios.get(`${config.getReceiversAroundMeUri}?distance=300&page=0&size=1000&units=km&x=${position[0]}&y=${position[1]}`)
      .then(({data}) => {
        this.setState({
          aroundMeReceivers: data,
        });
      })
  }

  onMapClicked = (event) => {
    this.setState({showOptions: true})
    this.removeAndAddCircle(event.latlng)
  }

  updateCircle = () => {
    this.removeAndAddCircle(this.state.latlng)
  }

  removeAndAddCircle = (latlng) => {
    this.removeCircle()
    position = [latlng.lat, latlng.lng]

    this.circle = L.circle(latlng, this.state.radius * 1000).addTo(this.resourceSuppliersMap);
    this.setState({
      latlng
    });
    currentMarker = new L.Marker(latlng).addTo(this.resourceSuppliersMap);
  }


  setTitleLayer() {
    const baseTileString = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const options = {
      attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
    };

    L.tileLayer(baseTileString, options).addTo(this.resourceSuppliersMap);

    // Add the search bar
    const self = this;
    L.Control.geocoder({
      defaultMarkGeocode: false,
      collapsed: false
    }).on('markgeocode', function(e) {
      const bbox = e.geocode.bbox;
      const poly = L.polygon([
        bbox.getSouthEast(),
        bbox.getNorthEast(),
        bbox.getNorthWest(),
        bbox.getSouthWest()
      ]);

      // Move to searched location
      self.resourceSuppliersMap.fitBounds(poly.getBounds()).setMinZoom(3);
      // Reset circle
      self.removeAndAddCircle(e.geocode.center);
      // Clear the input
      this._input.value = '';

    }).addTo(this.resourceSuppliersMap);
  }


  render() {

    const offerPPEparam = "/supplier-resource/new?lat=" + this.state.latlng.lat + "&lng=" + this.state.latlng.lng;
    const requestPPEparam = "/receiver-resource/new?lat=" + this.state.latlng.lat + "&lng=" + this.state.latlng.lng;
    const map = this.state.resourceSuppliersMap;

    if (this.state.aroundMeSuppliers.length > 0 && map !== null) {
      this.state.aroundMeSuppliers.forEach(function (value) {
        L.marker(value.latLng, {icon: supplierIcon}).addTo(map).bindPopup(value.supplyType);
      });
    }

    if (this.state.aroundMeReceivers.length > 0 && map !== null) {
      this.state.aroundMeReceivers.forEach(function (value) {
         L.marker(value.latLng, {icon: requesterIcon}).addTo(map).bindPopup(value.requestType);
      });
    }


    if (this.state.type === types['Request Medical Supplies'])
      return <Redirect to={requestPPEparam}/>
    else if (this.state.type === types['Supply Medical Supplies']) {
      return <Redirect to={offerPPEparam}/>
    }

    return (
      <Container className="col-auto ml-auto">
        <LeftPanel
          onButtonClicked={this.onButtonClicked.bind(this)}
          showOptions={this.state.showOptions}
          radius={this.state.radius}
          changeRadius={this.changeRadius}
        />

          <CookieConsent
            buttonText="I accept"
            style={{position: "absolute", bottom:"0px"}}
            buttonStyle={{ fontSize: "13px" }}
            expires={150}
          >
            This website uses cookies to enhance the user experience.{" "}
          </CookieConsent>

        <Row>
          <Col md="12" className="p-0">
            <div className="shadow-lg bg-white rounded">
              <div id='map-container'></div>
              <Popup
                open={this.state.open}
                closeOnDocumentClick
                onClose={this.closeModal}>
                {
                  this.state.type === types['Browse Available']
                    ? <PostedItemsComponent position={this.state.latlng} radius={this.state.radius}/>
                    : <RequestedItemsComponent position={this.state.latlng} radius={this.state.radius}/>
                }

              </Popup>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps)(MapComponent);
