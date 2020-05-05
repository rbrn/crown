import React from 'react';
import {connect} from 'react-redux';
import {LatLng} from './map';
import {Button} from 'reactstrap';
import {AvField, AvForm} from 'availity-reactstrap-validation';

export interface OwnProps {
  position: LatLng,
  radius: number,
  changeRadius: Function,
};
type Props = StateProps & DispatchProps & OwnProps


const img = "content/images/crown.png";

class LeftPanelComponent extends React.Component<Props> {
  render() {
    const {position: {lat, lng}, radius, changeRadius} = this.props;
    return (
      <div className="left-panel shadow-lg p-3 mb-5 bg-white rounded">
        <img src={img} style={{borderTopLeftRadius:'10px',borderTopRightRadius:'10px'}}/>
        <div className="align-content-center" style={{backgroundColor:'#00a1ff',borderBottomRightRadius:'10px',borderBottomLeftRadius:'10px'}}>
          <div className="align-content-center crown-header" style={{padding:'5px',color:'#fff'}}>A COVID-19 Open Data Network for Rapid, Affordable and Standardized Procurement of Manufactured Medical Supplies (MS)</div>
        </div>
        <div className="align-content-center">
          <div className="align-content-center crown-header-white">LOCATION</div>
        </div>

        <div className="radius-info-div">
          <p className="latlong">Coord: {lat}, {lng}</p>
          <div className="align-content-center" style={{marginBottom:'20px'}}>
            <div className="align-content-center crown-header-white">RADIUS (KM)</div>
          </div>

          <AvForm className="" onSubmit={changeRadius}>
            <AvField
              name="radius"
              type="number"
              placeholder="Enter Radius"
              required
              value={radius}
            />
            <Button variant="primary" size="md" className="btn btn-danger btn-md" style={{borderBottomLeftRadius:'0px',borderBottomRightRadius:'0px',borderTopRightRadius:'10px',borderTopLeftRadius:'10px'}} type="submit"> Change </Button>
          </AvForm>
        </div>
      </div>
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

export default connect(mapStateToProps)(LeftPanelComponent);
