import React, { ReactText } from 'react';
import { connect } from 'react-redux';
import { LatLng } from '../map/map';
import { Button, Card } from 'reactstrap';
import { AvField, AvForm } from 'availity-reactstrap-validation';
import { Slider } from 'antd';
import { SliderValue } from 'antd/lib/slider';

const BoxStyles = {
  background: '#FEFEFE 0% 0% no-repeat padding-box',
  boxShadow: '0px 3px 20px #23130C85',
  opacity: '1',
  borderRadius: '0px 30px 30px 0px'
};

const ButtonStyles = {
  textAlign: 'left',
  font: 'Bold 25px/26px Nunito',
  letterSpacing: '0px',
  color: '#FFFFFF',
  background: '#FF7C48 0% 0% no-repeat padding-box',
  boxShadow: '10px 7px 20px #0000001C',
  borderRadius: '7px',
  opacity: '1'
};

const TextRStyles = {
  textAlign: 'left' as const,
  font: 'Regular 19px/25px Montserrat',
  letterSpacing: '0px',
  color: '#333333',
  opacity: '1'
};
const TextMStyles = {
  textAlign: 'left' as const,
  font: 'Regular 19px/25px Montserrat',
  letterSpacing: '0px',
  color: '#333333',
  opacity: '1',
  border: '1px solid #DDE4EB'
};

export interface OwnProps {
  onButtonClicked: Function;
  showOptions: boolean;
  radius: number;
  changeRadius: (value: SliderValue | ReactText) => void;
}
type Props = StateProps & DispatchProps & OwnProps;

class BuyerLeftPanelComponent extends React.Component<Props> {
  render() {
    const { onButtonClicked, showOptions, radius, changeRadius } = this.props;
    return (
      <div
        className="buyer-left-panel shadow-lg rounded"
        style={{ background: 'none', backgroundColor: 'none', borderRadius: 20, overflow: 'hidden' }}
      >
        <Card className="details-card buyer-left-panel" style={BoxStyles}>
          <div className="radius-container">
            <span style={TextRStyles}>Radius</span>
            <span style={TextMStyles} className="radius-display">
              {radius} miles
            </span>
          </div>
          <Slider min={20} max={300} onChange={changeRadius} value={typeof radius === 'number' ? radius : 10} tooltipPlacement="bottom" />
          <div className="">
            <Button style={ButtonStyles} className="w-100 mb-2 cw-btn">
              Browse Available
              <img style={{ height: '26px', float: 'right' }} className="btn-img" src="content/images/supplies.svg" />
            </Button>
          </div>
        </Card>
      </div>
    );
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

export default connect(mapStateToProps)(BuyerLeftPanelComponent);
