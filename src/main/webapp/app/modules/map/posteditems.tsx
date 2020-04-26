import React, {createRef} from 'react';
import {connect} from 'react-redux';
import axios from 'axios'
import {Table} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Popup from "reactjs-popup";
import {LatLng} from './map';
import config from './apiConfig.json';
import NumberFormat from 'react-number-format';

export interface OwnProps {
    position: LatLng,
    radius: number,
};

type Props = StateProps & DispatchProps & OwnProps

// make this header based on given information
const headers = ["Item Type", "Quantity", "Action"]
const drilDownheaders = ["Supplier Name", "Email", "Quantity", "Action"]
const columns = ["Item Type", "Quantity"]

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

class PostedItemsComponent extends React.Component<Props, State> {
    state = {
        viewIndex: -1,
        fetchedData: [], // mocking the data
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
    
    claimItem(supplierResourceId, quantity) {
    	axios.get(`${config.createClaimUri}?supplierResourceId=${supplierResourceId}&quantity=${quantity}`)
            .then(() => {
                alert("claimed");
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
                <div className="panel-heading">Items available in your area</div>
                <div className="table-responsive">
                    {<div className="info-div">
                        <p> Getting data for user: {this.props.account.login} </p>
                        <p> lat, lng: {lat}, {lng} </p>
                        <p> Radius: {radius} KM </p>
                    </div>}
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
                                            <FontAwesomeIcon onClick={this.handleView(index)} icon='eye' color='green'
                                                             style={{cursor: 'pointer'}}/>{' '}
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
                {/* change this accordingly */}
                {
                    this.state.viewIndex !== -1 &&
                    <Popup
                        open={this.state.viewIndex !== -1}
                        closeOnDocumentClick
                        onClose={this.closeModel}
                    >
                        <div className="get-items-display">
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
                                                  {item.supplier  && item.supplier.name ?  item.supplier.name : ""}
                                            </td>
                                          }
                                            <td key={`${index.toString()}-Email`}>
                                                {item.supplier  && item.supplier.email ?  item.supplier.email : ""}
                                            </td>
                                            <td key={`${item.quantity}-Type`}>
                                                { item.quantity}
                                            </td>
                                            <td>
                                                <FontAwesomeIcon onClick={this.claimItem(item.id, item.quantity)} icon='pencil-alt' color='blue'
                                                             style={{cursor: 'pointer'}}/>{' '}
                                            </td>
                                        </tr>

                                    ))
                                }
                                </tbody>
                            </Table>
                            </div>
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
const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps)(PostedItemsComponent);
