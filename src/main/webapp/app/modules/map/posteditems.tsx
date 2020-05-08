import React, {createRef} from 'react';
import {connect} from 'react-redux';
import axios from 'axios'
import {Table} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Popup from "reactjs-popup";
import {LatLng} from './map';
import config from './apiConfig.json';
import {Redirect} from "react-router-dom";

export interface OwnProps {
  position: LatLng,
  radius: number,
};

type Props = StateProps & DispatchProps & OwnProps

// make this header based on given information
const headers = ["Item Type", "Quantity", "Action"]
const drilDownheaders = ["Supplier Name", "Email", "Quantity", "Request"]

type State = {
  viewIndex: number,
  fetchedData: any,
  redirectUrl: string,
};

class PostedItemsComponent extends React.Component<Props, State> {
  state = {
    viewIndex: -1,
    fetchedData: [], // mocking the data
    redirectUrl: ""
  }

  componentDidMount() {
    const {position: {lat, lng}, radius} = this.props;

    axios.get(`${config.getSupplierResourcesAggregatedUri}?distance=${radius}&page=0&size=1000&units=km&x=${lat}&y=${lng}`)
      .then(({data}) => {
        this.setState({
          fetchedData: data,
        });
      })
  }

  claimItem = (supplierResourceId, quantity) => () => {
    const {position: {lat, lng}} = this.props;
    const redirect = `${config.getNewClaimUrl}?x=${lat}&y=${lng}&supplierResourceId=${supplierResourceId}`
    this.setState({redirectUrl: redirect})
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
    if (this.state.redirectUrl !== "") {
     return <Redirect to={this.state.redirectUrl}/>
    }

    const {lat, lng} = this.props.position;
    const {radius} = this.props;
    return (
      <div className="scroll-container">
      <div className="get-items-display">
        <div className="panel-heading">Items available in your area</div>
      
          {<div className="info-div">
            <p> Getting data for user: {this.props.account.login} </p>
            <p> lat, lng: {lat}, {lng} </p>
            <p> Radius: {radius} KM </p>
          </div>}

          <div className="panel-row">
                <div className="col-sm-6 col-md-6 col-lg-6">
                <div className="table-responsive">
          <Table striped bordered hover size="sm">
            <thead>
            <tr>
              {
                headers.map(item => (
                  <th key={item} scope="col">
                    {item}
                  </th>
                ))
              }
            </tr>
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
                      <a onClick={this.handleView(index)}>
                        <FontAwesomeIcon icon='eye' color='green'
                                         style={{cursor: 'pointer'}}/>{' Details '}
                      </a>
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
          
          <div className="col-sm-6 col-md-6 col-lg-6" style={{float:'right'}}>
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
                  <tr>
                    {
                      drilDownheaders.map(item => (
                        <th key={item} scope="col">
                          {item}
                        </th>
                      ))
                    }
                  </tr>
                  </thead>
                  <tbody>
                  {
                    // change dummy data with required data
                    this.state.fetchedData[this.state.viewIndex].itemTypesList.map((item, index) => (

                      <tr key={item.toString() + index}>
                        {
                          <td key={`${index.toString()}-Name`}>
                            {item.supplier && item.supplier.name ? item.supplier.name : ""}
                          </td>
                        }
                        <td key={`${index.toString()}-Email`}>
                          {item.supplier && item.supplier.email ? item.supplier.email : ""}
                        </td>
                        <td key={`${item.quantity}-Type`}>
                          {item.quantity}
                        </td>
                        <td>
                          <button className={'btn btn-primary'} onClick={this.claimItem(item.id, item.quantity)}>
                            <FontAwesomeIcon
                              icon='pencil-alt' color='blue'
                              style={{cursor: 'pointer'}}/> {' Request this resource '}
                          </button>
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

export default connect(mapStateToProps)(PostedItemsComponent);
