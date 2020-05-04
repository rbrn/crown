import React, {createRef} from 'react';
import {connect} from 'react-redux';
import axios from 'axios'
import {Table, Button} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Popup from "reactjs-popup";
import {LatLng} from './map';
import config from './apiConfig.json';
import NumberFormat from 'react-number-format';
import { toast } from 'react-toastify';
import {Redirect} from "react-router-dom";
export interface OwnProps {
  position: LatLng,
  radius: number,
};

type Props = StateProps & DispatchProps & OwnProps

// make this header based on given information
const headers = ["Item Type", "Quantity", "Action"]
const columns = ["Item Type", "Quantity"]

const drilDownheaders = ["Requested By", "Email", "Quantity", "Offer"]

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
  fetchedData: any,
  redirectUrl: string,
};

class RequestedItemsComponent extends React.Component<Props, State> {
  state = {
    viewIndex: -1,
    fetchedData: [],
    redirectUrl: ''// mocking the data
  }

  componentDidMount() {
    const {position: {lat, lng}, radius} = this.props;

    axios.get(`${config.getReceiverResourcesAggregatedUri}?distance=${radius}&page=0&size=1000&units=km&x=${lat}&y=${lng}`)
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

  claimItem = (item) => () => {
    const {position: {lat, lng}} = this.props;
    const redirect = `${config.getNewClaimUrlByRequests}?x=${lat}&y=${lng}&receiverResourceId=${item.id}`
    this.setState({redirectUrl: redirect})
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

    if (this.state.redirectUrl !== "") {
      return <Redirect to={this.state.redirectUrl}/>
    }

    return (
      <div className="scroll-container">
      <div className="get-items-display">
        {<div className="info-div">
          <h4>Items requested in your area</h4>
          <p> Getting data for user: {this.props.account.login} </p>
          <p> lat, lng: {lat}, {lng} </p>
          <p> Radius: {radius} KM </p>
        </div>}
        <div className="panel-row">
        <div className="col-sm-6">
        <div className="table-responsive">
          <Table striped bordered hover size="sm">
            <thead>
            {
              headers.map(item => (
                <th key={item} scope="col">
                  {item}
                </th>
              ))
            }
            </thead>
            <tbody>
            {
              // change dummy data with required data
              this.state.fetchedData.map((item, index) => (
                <tr key={item.itemType}>
                    <td key={`${item.itemType}-Type`}>
                      {item.itemType}
                    </td>
                    <td key={`${item.countItems}-Name`}>
                      {item.countItems}
                    </td>
                  <td>
                    <div className='action-items flex'>
                      {/* <FontAwesomeIcon onClick={this.handleDelete} icon='trash' color='red' style={{cursor: 'pointer'}}/>{' '} */}
                      {/* <FontAwesomeIcon onClick={this.handleEdit} icon='pencil-alt' color='blue' style={{cursor: 'pointer'}}/>{' '} */}
                     <a  onClick={this.handleView(index)}><FontAwesomeIcon icon='eye' color='green'
                                       style={{cursor: 'pointer'}}/>  {' Details '}</a>
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
        </div>
        </div>
        {/* change this accordingly */}
        {
          this.state.viewIndex !== -1 &&
          <div className="col-sm-6" style={{float:'right'}}>
              <div className="get-items-display-details">
                <div className="panel-heading">Detailed View</div>
                <div className="table-responsive">
                  {
                    /*   <pre>
                          <code>
                              {JSON.stringify(this.state.fetchedData[this.state.viewIndex].itemTypesList, undefined, 4)}
                          </code>
                      </pre>*/
                  }
                  <Table striped bordered hover size="sm">
                    <thead>
                    {
                      drilDownheaders.map(item => (
                        <th key={item} scope="col">
                          {item}
                        </th>
                      ))
                    }
                    </thead>
                    <tbody>
                    {
                      // change dummy data with required data
                      this.state.fetchedData[this.state.viewIndex].itemTypesList.map((item, index) => (

                        <tr key={item.toString() + index}>
                          {
                            <td key={`${index.toString()}-Name`}>
                              {item.name ?  item.name : ""}
                            </td>
                          }
                          <td key={`${index.toString()}-Email`}>
                            {item  && item.receiver.email ?  item.receiver.email : ""}
                          </td>
                          <td key={`${item.quantity}-Type`}>
                            { item.quantity}
                          </td>
                          <td>
                            <button className={'btn btn-primary'} onClick={ this.claimItem(item) }><FontAwesomeIcon  icon='pencil-alt' color='blue'
                                                                                                                     style={{cursor: 'pointer'}}/>{' Offer to fulfil '}</button>
                          </td>
                        </tr>

                      ))
                    }
                    </tbody>
                  </Table>
                </div>
              </div>
           </div>
        }
      </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
});
const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps)(RequestedItemsComponent);
