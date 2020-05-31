import React from 'react';
import {connect} from 'react-redux';
import {LatLng} from './map';
import {Button, Card} from 'reactstrap';
import { AvField, AvForm } from 'availity-reactstrap-validation';

export interface OwnProps {
  position: LatLng,
  radius: number,
  changeRadius: Function,
  onButtonClicked: Function,
  showOptions: boolean
};
type Props = StateProps & DispatchProps & OwnProps


const img = "content/images/crown.png";

class LeftPanelComponent extends React.Component<Props> {
  render() {
    const { position: { lat, lng }, radius, changeRadius, onButtonClicked, showOptions } = this.props;
    return (
      <div className="left-panel shadow-lg p-3 mb-5 bg-blue rounded">
        <img src={img} style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }} />
        <div className="align-content-center">
          <div className="align-content-center crown-header" style={{ padding: '5px', color: '#fff' }}>A COVID-19 Open Data Network for Rapid, Affordable and Standardized Procurement of Manufactured Medical Supplies (MS)</div>
        </div>
        <div className="align-content-center">
          <div className="align-content-center crown-header-white">LOCATION</div>
        </div>

        <div className="radius-info-div">
          <p className="latlong">Coord: {lat}, {lng}</p>
          <div className="align-content-center">
            <div className="align-content-center crown-header-white">RADIUS (KM)</div>
          </div>

          <AvForm className="radius-submit" onSubmit={changeRadius}>
            <AvField
              name="radius"
              type="number"
              placeholder="Enter Radius"
              required
              value={radius}
            />
            <Button className="radius-button" type="submit"> Change </Button>
          </AvForm>

          <hr />
          {
            showOptions ? <Card className="details-card">
              <h6>I am a medical worker</h6>
              <div className=''>
                <Button onClick={() => onButtonClicked('Browse Available')} className='w-100 mb-2 cw-btn'>Browse Available</Button>
                <Button onClick={() => onButtonClicked('Request Medical Supplies')} className='w-100 mb-2 cw-btn'>Request Medical Supplies</Button>
              </div>
              <h6>I am a maker/manufacturer</h6>
              <div className=''>
                <Button onClick={() => onButtonClicked('Browse Requeste')} className='w-100 mb-2 cw-btn'>Browse Requested</Button>
                <Button onClick={() => onButtonClicked('Supply Medical Supplies')} className='w-100 cw-btn'>Supply Medical Supplies</Button>
              </div>
            </Card> :
              null
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  showMapPopup: storeState.applicationProfile.showMapPopup
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps)(LeftPanelComponent);
