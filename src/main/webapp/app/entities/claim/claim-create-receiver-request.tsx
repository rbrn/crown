import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Label, Row} from 'reactstrap';
import {AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {Translate, translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';
import {getEntities as getReceiverResources} from 'app/entities/receiver-resource/receiver-resource.reducer';
import {getEntities as getSupplierResources} from 'app/entities/supplier-resource/supplier-resource.reducer';
import {createEntity, getEntity, reset, updateEntity} from './claim.reducer';
import Claim from "app/entities/claim/claim";
import {defaultValue} from "app/shared/model/claim.model";

export interface IClaimRequestByReceiverProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ClaimRequestByReceiverRequest = (props: IClaimRequestByReceiverProps) => {
  const [receiverResourceId, setReceiverResourceId] = useState('0');
  const [ entity, setEntity] = useState(defaultValue);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const { claimEntity, receiverResources, supplierResources, loading, updating } = props;


  const handleClose = () => {
    props.history.push('/claim');
  };

  useEffect(() => {
    const localReceiverResourceId  = new URLSearchParams(props.location.search).get("receiverResourceId");

    if(localReceiverResourceId) {
      setReceiverResourceId( localReceiverResourceId )
    }

    props.getReceiverResources();
    props.getSupplierResources();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);


  useEffect(() => {

   const selectedReceiverResource = props.receiverResources.find( receiverResource=> receiverResource.id === receiverResourceId);
    if(selectedReceiverResource) {
        setEntity(  { receiverResource : selectedReceiverResource})
    }
  }, [props.receiverResources]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const persistent = {
        ...entity,
        ...values
      };

      const selectedSupplierResource = props.supplierResources.find( supplierResource=> supplierResource.id === persistent.supplierResource.id);
      if(selectedSupplierResource) {
        persistent.supplierResource = selectedSupplierResource
      }

      props.createEntity(persistent);
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="crownApp.claim.home.createOrEditLabel">
            <Translate contentKey="crownApp.claim.home.createOrEditLabel">Create or edit a Claim</Translate>
          </h2>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={entity} onSubmit={saveEntity}>
              <AvGroup>
                <Label for="claim-receiverResource">
                  <Translate contentKey="crownApp.claim.receiverResource">Receiver Resource</Translate>
                </Label>
                { entity.receiverResource ? (
                    <Label for="claim-supplierResource">
                      Supplier: {entity.receiverResource?.receiver.name},
                      Resource type: {entity.receiverResource?.resourceType?.name},
                      Quantity: {entity.receiverResource?.quantity}, Id: {entity.receiverResource?.id}
                    </Label>) :
                  null}
              </AvGroup>

              <AvGroup>
                <Label for="claim-supplierResource">
                  <Translate contentKey="crownApp.claim.supplierResource">Supplier Resource</Translate>
                </Label>
                <AvInput id="claim-supplierResource" type="select" className="form-control"
                         name="supplierResource.id">
                  <option value="" key="0" />
                  {supplierResources
                    ? supplierResources.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                       Supplier: {otherEntity.supplier?.name}, Type: {otherEntity.resourceType?.name}, Quantity: {otherEntity.quantity}, Id: {otherEntity.id}
                      </option>
                    ))
                      : null}
                </AvInput>
              </AvGroup>

              <AvGroup>
                <Label id="quantityLabel" for="claim-quantity">
                  <Translate contentKey="crownApp.claim.quantity">Quantity</Translate>
                </Label>
                <AvField
                  id="claim-quantity"
                  type="string"
                  className="form-control"
                  name="quantity"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="notesLabel" for="claim-notes">
                  <Translate contentKey="crownApp.claim.notes">Notes</Translate>
                </Label>
                <AvField id="claim-notes" type="textarea" name="notes" />
              </AvGroup>

              <Button tag={Link} id="cancel-save" to="/claim" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
                &nbsp;
              <Button style={{ backgroundColor: 'green' }} id="save-entity" type="submit" disabled={updating}>
                  Confirm Order
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  receiverResources: storeState.receiverResource.entities,
  supplierResources: storeState.supplierResource.entities,
  claimEntity: storeState.claim.entity,
  loading: storeState.claim.loading,
  updating: storeState.claim.updating,
  updateSuccess: storeState.claim.updateSuccess
});

const mapDispatchToProps = {
  getReceiverResources,
  getSupplierResources,
  getEntity,
  updateEntity,
  createEntity
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ClaimRequestByReceiverRequest);
