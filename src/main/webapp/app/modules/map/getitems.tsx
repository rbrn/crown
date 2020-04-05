import React, {createRef} from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
import {Table} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Popup from "reactjs-popup";
import {LatLng} from './map';
import config from './apiConfig.json';

export interface OwnProps {
  position: LatLng,
  radius: number,
};
  
type Props = StateProps & DispatchProps & OwnProps

// make this header based on given information
const headers = ["ID", "Name", "Notes", "Action"]
const columns = ["id", "name", "notes"]
const dummyData = [{
  "id": "string1",
  "name": "string1",
  "notes": "string1",
  "supplyPointResource": {
    "canProduce": 0,
    "id": "string1",
    "numRequested": 0,
    "numinStock": 0,
    "resources": [
      null
    ],
    "supplypoint": {
      "address": "string1",
      "city": "string1",
      "hasSterilization": true,
      "id": "string1",
      "isDistributor": true,
      "isHealthcare": true,
      "latx": 0,
      "longy": 0,
      "name": "string1",
      "notes": "string1",
      "phonenumber": "string1",
      "primaryContactName": "string1",
      "priority": 0,
      "resourceLocations": [
        null
      ],
      "state": "string1",
      "zip": "string1"
    }
  }
},
{
    "id": "string2",
    "name": "string2",
    "notes": "string2",
    "supplyPointResource": {
      "canProduce": 0,
      "id": "string2",
      "numRequested": 0,
      "numinStock": 0,
      "resources": [
        null
      ],
      "supplypoint": {
        "address": "string2",
        "city": "string2",
        "hasSterilization": true,
        "id": "string2",
        "isDistributor": true,
        "isHealthcare": true,
        "latx": 0,
        "longy": 0,
        "name": "string2",
        "notes": "string2",
        "phonenumber": "string2",
        "primaryContactName": "string2",
        "priority": 0,
        "resourceLocations": [
          null
        ],
        "state": "string2",
        "zip": "string2"
      }
    }
  },
  {
    "id": "string3",
    "name": "string3",
    "notes": "string3",
    "supplyPointResource": {
      "canProduce": 0,
      "id": "string3",
      "numRequested": 0,
      "numinStock": 0,
      "resources": [
        null
      ],
      "supplypoint": {
        "address": "string3",
        "city": "string3",
        "hasSterilization": true,
        "id": "string3",
        "isDistributor": true,
        "isHealthcare": true,
        "latx": 0,
        "longy": 0,
        "name": "string3",
        "notes": "string3",
        "phonenumber": "string3",
        "primaryContactName": "string3",
        "priority": 0,
        "resourceLocations": [
          null
        ],
        "state": "string3",
        "zip": "string3"
      }
    }
  }
]
const actionItems = [
    {
        icon: 'trash',
        color: 'red',
        style: {cursor: 'pointer'},
    },
    {
        icon: 'pencil-alt',
        color: 'blue',
        style: {cursor: 'pointer'},
    },
    {
        icon: 'eye',
        color: 'green',
        style: {cursor: 'pointer'},
    },
]

type State = {
  viewIndex: number,
  fetchedData: any 
};

class PostComponent extends React.Component<Props, State> {
  state = {
    viewIndex: -1,
    fetchedData: dummyData, // mocking the data
  }
  componentDidMount() {
    const {position: {lat, lng}, radius} = this.props;
    axios.get(`${config.getUri}?distance=${radius}&page=0&size=1000&units=km&x=${lat}&y=${lng}`)
    .then(({data}) => {
      this.setState({
        fetchedData: data,
      });
    })
  }

  closeModel = () => {
    this.setState({
        viewIndex: -1,
    });
  }

  handleView = (index) => () => {
    // implement view feature here
    this.setState({
        viewIndex: index
    });
  }


  render() {
    const {lat, lng} = this.props.position;
    const {radius} = this.props;
    return (
      <div className="get-items-display">
        <div className="info-div">
          <p> Getting data for user: {this.props.account.login} </p>
          <p> lat, lng: {lat}, {lng} </p>
          <p> Radius: {radius} KM </p>
        </div>
        <Table>
          <thead>
            {
              headers.map(item => (
                <th key={item}>
                  {item}
                </th>
              ))
            }
          </thead>
          <tbody>
            {
              // change dummy data with required data
              this.state.fetchedData.map((item, index) => (
                <tr key={item.id}>
                  {
                    columns.map(col => (
                      <td key={`${item.id}-${col}`}>
                        {item[col]}
                      </td>
                    ))
                  }
                  {/* for the action column. Change the icons */}
                  <td>
                    <div className='action-items flex'>
                      {/* <FontAwesomeIcon onClick={this.handleDelete} icon='trash' color='red' style={{cursor: 'pointer'}}/>{' '} */}
                      {/* <FontAwesomeIcon onClick={this.handleEdit} icon='pencil-alt' color='blue' style={{cursor: 'pointer'}}/>{' '} */}
                      <FontAwesomeIcon onClick={this.handleView(index)} icon='eye' color='green' style={{cursor: 'pointer'}}/>{' '}
                    </div>
                    <div>
                    </div>
                    <div>
                    </div>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </Table>
        {/* change this accordingly */}
        {
            this.state.viewIndex !== -1 && 
            <Popup
                open={this.state.viewIndex !== -1}
                closeOnDocumentClick
                onClose={this.closeModel}
            >
                <div className="info-div">
                    <pre>
                        <code>
                            {JSON.stringify(this.state.fetchedData[this.state.viewIndex].supplyPointResource, undefined, 4)}
                        </code>
                    </pre>
                </div>
            </Popup>
        }
      </div>
    )
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
});
const mapDispatchToProps = { };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps)(PostComponent);
