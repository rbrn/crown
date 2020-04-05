import React from 'react';
import { connect } from 'react-redux';
import {LatLng} from './map';
import {Button} from 'reactstrap';
import { AvField, AvForm } from 'availity-reactstrap-validation';

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
        <div className="left-panel">
          <img src={img} />
          <div className="radius-info-div">
          <p>LatLng: {lat}, {lng}</p>
            <AvForm onSubmit={changeRadius}>
              <AvField
                  name="radius"
                  type="number"
                  label="Radius (km)"
                  placeholder="Enter Radius"
                  required
                  value={radius}
              />
              <Button type="submit"> Change </Button>
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

const mapDispatchToProps = { };
  
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps)(LeftPanelComponent);
  