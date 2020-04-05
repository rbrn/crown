import './map.scss';

import React, {createRef} from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert, Row, Col } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";

import GetItems from './getitems';
import PostItems from './postitems';
import LeftPanel from './leftpanel';

import 'leaflet';
import 'leaflet/dist/leaflet.css';

declare global {
  interface Window {
      L:any;
  }
}

const { L } = window;

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "content/images/marker-icon-2x.png",
  iconUrl: "content/images/marker-icon.png",
  shadowUrl: "content/images/marker-shadow.png",
});

export interface MapProps extends StateProps, DispatchProps {}
export type LatLng = {
  lat: number,
  lng: number,
};
type State = {
  open: boolean,
  latlng: LatLng,
  type: string,
  radius: number,
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
const types = {
  Get: 'Get',
  Post: 'Post',
};
const position = [51.505, -0.09];
class MapComponent extends React.Component<MapProps, State> {
  private mymap: Map;
  circle = {};
  state = {
    open: false,
    latlng: defaultLatLng,
    type: types.Get,
    radius: 10
  };

  changeRadius = (event, error, values) => {
    this.setState({
      radius: values.radius
    })
  }

  closeModal = () => {
    this.setState({
      open: false,
      latlng: defaultLatLng,
      type: types.Get,
    })
  }

  componentDidMount() {
    // use this.props.account to set view after the geo location of user is obtained
    this.mymap = L.map('map-container').setView([51.505, -0.09], 10);
    this.mymap.on('click' , (event) => this.onMapClicked(event));
    this.setTitleLayer();
  }

  onButtonClicked = (latlng, type, event) => {
    this.setState({
      open: true,
      type,
    })
  }

  removeCircle = () => {
    this.mymap.removeLayer(this.circle)
  }

  onMapClicked = (event) => {
    this.removeCircle()

    L.popup()
    .setLatLng(event.latlng)
    .setContent((layer) => this.showPopup(layer, event.latlng))
    .openOn(this.mymap)
    .on('remove', () => {
      this.removeCircle();
    })

    this.circle = L.circle(event.latlng, this.state.radius * 1000).addTo(this.mymap);
    this.setState({
      latlng: event.latlng
    });
  }

  showPopup = (layer, latlng) => {
    const node = L.DomUtil.create('div', 'popup-div info-div');
    Object.keys(types).forEach(type => {
      const button = L.DomUtil.create('button', 'popup-button btn btn-secondary', node);
      button.innerHTML = type;
      button.onclick = (e) => this.onButtonClicked(latlng, type, e);
    });
    return node;
  }

  setTitleLayer() {
    const baseTileString = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const options = {
      attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
    };

    L.tileLayer(baseTileString, options).addTo(this.mymap);
  }

  render() {
    return (
      <Row>
        <Col md="3">
          <LeftPanel radius={this.state.radius} position={this.state.latlng} changeRadius={this.changeRadius}/>
        </Col>
        <Col md="9">
        <div>
          <div id='map-container'></div>
            <Popup
              open={this.state.open}
              closeOnDocumentClick
              onClose={this.closeModal}
            >
              {
                this.state.type === types.Get 
                ? <GetItems position={this.state.latlng} radius={this.state.radius} />
                : <PostItems position={this.state.latlng} />
              }
            </Popup>
          </div>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { };
  
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps)(MapComponent);
