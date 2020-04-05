import React, {createRef} from 'react';
import {connect} from 'react-redux';
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Popup from "reactjs-popup";
import {LatLng} from './map';
import config from './apiConfig.json';
import {translate, Translate} from "react-jhipster";
import {Link} from "react-router-dom";
import {Button, Row, Col, Label} from 'reactstrap';
import {AvFeedback, AvForm, AvGroup, AvInput, AvField} from 'availity-reactstrap-validation';
import ReceiverResource from "app/entities/receiver-resource/receiver-resource";

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
            position: [
                lat,
                lng
            ],
            quantity: 2
        }
    }

     saveEntity = (event, errors, values) => {
         values.position = this.state.position
         axios.post(config.postUri, values)
    };

    render() {
        const {lat, lng} = this.props.position;
        return (
            <div className="post-items-display">

                <AvForm model={ {}  } onSubmit={this.saveEntity}>

                    <AvGroup>
                        <Label id="nameLabel" for="receiver-resource-name">
                            <Translate contentKey="crownApp.receiverResource.name">Name</Translate>
                        </Label>
                        <AvField
                            id="receiver-resource-name"
                            type="text"
                            name="name"
                            validate={{
                                required: {value: true, errorMessage: translate('entity.validation.required')}
                            }}
                        />
                    </AvGroup>
                    <AvGroup>
                        <Label id="quantityLabel" for="receiver-resource-quantity">
                            <Translate contentKey="crownApp.receiverResource.quantity">Quantity</Translate>
                        </Label>
                        <AvField
                            id="receiver-resource-quantity"
                            type="string"
                            className="form-control"
                            name="quantity"
                            validate={{
                                required: {value: true, errorMessage: translate('entity.validation.required')},
                                number: {value: true, errorMessage: translate('entity.validation.number')}
                            }}
                        />
                    </AvGroup>
                    <AvGroup>
                        <Label id="dailyUseLabel" for="receiver-resource-dailyUse">
                            <Translate contentKey="crownApp.receiverResource.dailyUse">Daily Use</Translate>
                        </Label>
                        <AvField
                            id="receiver-resource-dailyUse"
                            type="string"
                            className="form-control"
                            name="dailyUse"
                            validate={{
                                required: {value: true, errorMessage: translate('entity.validation.required')},
                                number: {value: true, errorMessage: translate('entity.validation.number')}
                            }}
                        />
                    </AvGroup>
                    <AvGroup>
                        <Label id="currentStockLabel" for="receiver-resource-currentStock">
                            <Translate contentKey="crownApp.receiverResource.currentStock">Current Stock</Translate>
                        </Label>
                        <AvField id="receiver-resource-currentStock" type="string" className="form-control"
                                 name="currentStock"/>
                    </AvGroup>
                    <AvGroup>
                        <Label id="notesLabel" for="receiver-resource-notes">
                            <Translate contentKey="crownApp.receiverResource.notes">Notes</Translate>
                        </Label>
                        <AvField id="receiver-resource-notes" type="text" name="notes"/>
                    </AvGroup>
                    <Button tag={Link} id="cancel-save" to="/receiver-resource" replace color="info">
                        <FontAwesomeIcon icon="arrow-left"/>
                        &nbsp;
                        <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
                    </Button>
                    &nbsp;
                    <Button color="primary" id="save-entity" type="submit">
                        <FontAwesomeIcon icon="save"/>
                        &nbsp;
                        <Translate contentKey="entity.action.save">Save</Translate>
                    </Button>
                </AvForm>
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

export default connect(mapStateToProps)(PostComponent);
