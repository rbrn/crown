import React, {ReactText} from 'react';
import {connect} from 'react-redux';
import {LatLng} from './map';
import {Button, Card} from 'reactstrap';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import {Slider} from "antd";
import {SliderValue} from "antd/lib/slider";

export interface OwnProps {
  onButtonClicked: Function,
  showOptions: boolean
  radius: number,
  changeRadius: (value: SliderValue | ReactText) => void
};
type Props = StateProps & DispatchProps & OwnProps

class LeftPanelComponent extends React.Component<Props> {
  render() {
    const { onButtonClicked, showOptions, radius, changeRadius } = this.props;
    return (
      <div className="left-panel shadow-lg rounded">
          {
            showOptions ? <Card className="details-card">
              <div className="radius-container">
                <span>Radius</span>
                <span className="radius-display">{radius} KM</span>
              </div>
              <Slider
                min={10}
                max={300}
                onChange={changeRadius}
                value={typeof radius === 'number' ? radius : 10}
                tooltipPlacement="bottom"
              />
              <h6>I am a medical worker</h6>
              <div className=''>
                <Button onClick={() => onButtonClicked('Browse Available')} className='w-100 mb-2 cw-btn'>
                  Browse Available
                  <img className="btn-img" src='content/images/supplies.svg' />
                </Button>
                <Button onClick={() => onButtonClicked('Request Medical Supplies')} className='w-100 mb-2 cw-btn'>
                  Request Medical Supplies
                  <img className="btn-img" src='content/images/supplies.svg' />
                </Button>
              </div>
              <h6>I am a maker/manufacturer</h6>
              <div className=''>
                {/* <Button onClick={() => onButtonClicked('Browse Requeste')} className='w-100 mb-2 cw-btn secondary'>
                  Browse Requested
                  <img className="btn-img" src='content/images/requests.svg' />
                </Button> */}
                <Button onClick={() => onButtonClicked('Supply Medical Supplies')} className='w-100 cw-btn secondary'>
                  Supply Medical Supplies
                  <img className="btn-img" src='content/images/requests.svg' />
                </Button>
              </div>
            </Card> :
              null
          }
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
