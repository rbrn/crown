/* eslint-disable no-console */
import './map.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Col, Row, Container } from 'reactstrap';
import Popup from "reactjs-popup";

import PostedItemsComponent from './posteditems';

import LeftPanel from './leftpanel';
import 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Redirect } from "react-router-dom";
import RequestedItemsComponent from "app/modules/map/requestedItems";
import axios from "axios";
import config from "app/modules/map/apiConfig.json";

declare global {
  interface Window {
    L: any;
  }
}

const { L } = window;


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

// type for latitude and longitude
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
};
type Map = {
  on: Function,
  removeLayer: Function,
}

// change this after user is tagged with geo location
const defaultLatLng = {
  lat: 51.505,
  lng: -0.09,
};

// Used for buttons on map
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

const supplierIcon = new LeafIcon({ iconUrl: '../../../content/images/supplies-svgrepo-com.svg' });
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
    showOptions: false,
    type: types['Browse Available'],
    radius: 10,
    aroundMeSuppliers: [],
    aroundMeReceivers: [],
    resourceSuppliersMap: {}
  };


  changeRadius = (event, error, values) => {
    this.setState({
      radius: values.radius
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
      latlng: browserLatLng
    });

    this.setState({
      resourceSuppliersMap: this.resourceSuppliersMap
    }
    )
    currentMarker = new L.Marker(browserLatLng).addTo(this.resourceSuppliersMap);
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
      .then(({ data }) => {
        this.setState({
          aroundMeSuppliers: data,
        });
      })


    axios.get(`${config.getReceiversAroundMeUri}?distance=300&page=0&size=1000&units=km&x=${position[0]}&y=${position[1]}`)
      .then(({ data }) => {
        this.setState({
          aroundMeReceivers: data,
        });
      })
  }

  onMapClicked = (event) => {
    this.setState({ showOptions: true })
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
  }

  render() {

    const offerPPEparam = "/supplier-resource/new?lat=" + this.state.latlng.lat + "&lng=" + this.state.latlng.lng;
    const requestPPEparam = "/receiver-resource/new?lat=" + this.state.latlng.lat + "&lng=" + this.state.latlng.lng;
    const map = this.state.resourceSuppliersMap;


    // Supply icons on the map
    if (this.state.aroundMeSuppliers.length > 0 && map !== null) {
      this.state.aroundMeSuppliers.forEach(function (value) {
        L.marker(value.latLng, { icon: supplierIcon }).addTo(map).bindPopup(value.supplyType);
      });
    }

    // Request icons on the map
    if (this.state.aroundMeReceivers.length > 0 && map !== null) {
      this.state.aroundMeReceivers.forEach(function (value) {
         L.marker(value.latLng, {icon: requesterIcon}).addTo(map).bindPopup(value.supplyType);
      });
    }

   // console.log(this.state.aroundMeReceivers);

    if (this.state.type === types['Request Medical Supplies'])
      return <Redirect to={requestPPEparam} />
    else if (this.state.type === types['Supply Medical Supplies']) {
      return <Redirect to={offerPPEparam} />
    }

    return (
      <Container className="col-auto ml-auto">
        <Row>
          <Col className="col-sm-3 p-0">
            <LeftPanel showOptions={this.state.showOptions} onButtonClicked={this.onButtonClicked.bind(this)} radius={this.state.radius} position={this.state.latlng} changeRadius={this.changeRadius} />
          </Col>
          <Col md="9">
            <div className="shadow-lg p-3 mb-5 bg-white rounded">
              <div id='map-container'></div>
              <Popup
                open={this.state.open}
                closeOnDocumentClick
                onClose={this.closeModal}>
                {
                  this.state.type === types['Browse Available']
                    ? <PostedItemsComponent position={this.state.latlng} radius={this.state.radius} />
                    : <RequestedItemsComponent position={this.state.latlng} radius={this.state.radius} />
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
