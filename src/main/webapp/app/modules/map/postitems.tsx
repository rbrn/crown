import React, {createRef} from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import {Button} from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from "reactjs-popup";
import {LatLng} from './map';
import config from './apiConfig.json';

export interface OwnProps {
  position: LatLng,
};
type Props = StateProps & DispatchProps & OwnProps

type State = {
    user: any,
    name: string,
    currentStock: number,
    quantity: number,
    notes: string,
    dailyUse: number
    position: any,
  };

const form = [
  {
    placeholder: "Enter Name", 
    error: "Required", 
    required: true, 
    name: "name", 
    type: "string", 
    label: "Name"
  },

  {
    placeholder: "Enter Quantity", 
    error: "Required", 
    required: true, 
    name: "quantity", 
    type: "number", 
    label: "Quantity"
  },
  
  {
    placeholder: "Enter Extra Notes", 
    error: "Required", 
    required: true, 
    name: "notes", 
    type: "string", 
    label: "Extra Notes"
  },
//   {
//     placeholder: "Enter Daily Use", 
//     error: "Required", 
//     required: false, 
//     name: "dailyUse", 
//     type: "string", 
//     label: "Extra Notes"
//   },
//   {
//     placeholder: "Enter Current Stock", 
//     error: "Required", 
//     required: false, 
//     name: "currentStock", 
//     type: "string", 
//     label: "Extra Notes"
//   },
]


// change this accordingly

class PostComponent extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    const {lat, lng} = props.position;
    this.state = {
      user: this.props.account,
      currentStock: 10,
      dailyUse: 1,
      name: "",
      notes: "",
      position: {
        "type": "Point",
        "coordinates": [
          lat,
          lng
        ]
      },
      quantity: 2
    }
  }

  postData = (event, errors, values)=> {
    // post the states in the api
     axios.post(config.postUri, this.state)
  }

  render() {
    const {lat, lng} = this.props.position;
    return (
      <div className="post-items-display">
          <AvForm onSubmit={this.postData}>
            {form.map(item => (
                <AvField
                    key={item.name}
                    name={item.name}
                    type={item.type}
                    label={item.label}
                    placeholder={item.placeholder}
                    required={item.required}
                    errorMessage={item.error}
                />
            ))}
            <Button type="submit"> Submit </Button>
          </AvForm>
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

export default connect(mapStateToProps)(PostComponent);
