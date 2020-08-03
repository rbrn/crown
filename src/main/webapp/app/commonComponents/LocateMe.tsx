import './map.scss';

import React from 'react';
import {connect} from 'react-redux';
import {Col, Row, Container, Button} from 'reactstrap';
import Popup from "reactjs-popup";

const {L} = window;
const defaultLocation = "Torronto, Canada"
type State = {
    currentLocation: string
  };

  export interface LocateMeProps extends StateProps, DispatchProps {
}


export type LatLng = {
  lat: number,
  lng: number,
};

export class LocateMeComponent extends React.Component<LocateMeProps, State> {
  state = {
    currentLocation: ''
  };
componentDidMount() {
    // check for Geolocation support
    if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition((pos) => {
          const position = [pos.coords.latitude, pos.coords.longitude]
          this.onClientPositionIdentified(position);
        }, (error) => {
            alert("Problem getting geolocation " + error.message);
            this.setState(
              {
                currentLocation: defaultLocation
              })
          
            }) 
      } else {
        this.setState(
          {
            currentLocation: defaultLocation
          })
      }
  }

  private onClientPositionIdentified(identifiedPosition) {  
    const browserLatLng = {
        lat: identifiedPosition[0],
        lng: identifiedPosition[1],
      }; 
    const geocoder = L.Control.Geocoder.nominatim();
    geocoder.reverse(browserLatLng, 10, this.setCurrentLocation);
  }

  setCurrentLocation = (results) => {
    let userLocation = defaultLocation
    if(results[0] != null){
      userLocation = results[0].name
    }
    this.setState(
      {
        currentLocation: userLocation
      }
    )
  }
  render() {

  return (
  
           <div>
               {this.state.currentLocation}
           </div>
        
         /* 
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
          */
     
  )
}
}


const locateMeStateToProps = storeState => ({
    account: storeState.authentication.account,
    isAuthenticated: storeState.authentication.isAuthenticated
  });
  
  const locateMeDispatchToProps = {};
  
  type StateProps = ReturnType<typeof locateMeStateToProps>;
  type DispatchProps = typeof locateMeDispatchToProps;
  
  export default connect(locateMeStateToProps)(LocateMeComponent);
