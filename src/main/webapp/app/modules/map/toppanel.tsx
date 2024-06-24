import React, {ReactText} from 'react';
import {connect} from 'react-redux';
import {LatLng} from './map';
import {Button, Card} from 'reactstrap';
import {AvField, AvForm} from 'availity-reactstrap-validation';
import {Row, Col} from 'antd'
import {Slider, InputNumber} from 'antd';
import {SliderValue} from "antd/lib/slider";

export interface OwnProps {
  address: string,
  radius: number,
  changeRadius: (value: SliderValue | ReactText) => void
};

type Props = StateProps & DispatchProps & OwnProps

const img = "content/images/crown.png";

class TopPanelComponent extends React.Component<Props> {
  render() {
    const {address, radius, changeRadius} = this.props;
    return (
      <div className="top-panel">
        <span>Radius</span>
        <Slider
          min={10}
          max={300}
          onChange={changeRadius}
          value={typeof radius === 'number' ? radius : 10}
          tooltipPlacement="bottom"
        />
        <span className="radius-display">{radius} KM</span>
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

export default connect(mapStateToProps)(TopPanelComponent);
