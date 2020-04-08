import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IResourceType } from 'app/shared/model/resource-type.model';
import { getEntities as getResourceTypes } from 'app/entities/resource-type/resource-type.reducer';
import { IReceiverSupplier } from 'app/shared/model/receiver-supplier.model';
import { getEntities as getReceiverSuppliers } from 'app/entities/receiver-supplier/receiver-supplier.reducer';
import { getEntity, updateEntity, createEntity, reset } from './receiver-resource.reducer';
import { IReceiverResource } from 'app/shared/model/receiver-resource.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IReceiverResourceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReceiverResourceUpdate = (props: IReceiverResourceUpdateProps) => {
  const [resourceTypeId, setResourceTypeId] = useState('0');
  const [receiverId, setReceiverId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { receiverResourceEntity, resourceTypes, receiverSuppliers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/receiver-resource');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getResourceTypes();
    props.getReceiverSuppliers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...receiverResourceEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="crownApp.receiverResource.home.createOrEditLabel">
            <Translate contentKey="crownApp.receiverResource.home.createOrEditLabel">Create or edit a ReceiverResource</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : receiverResourceEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="receiver-resource-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="receiver-resource-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="receiver-resource-name">
                  <Translate contentKey="crownApp.receiverResource.name">Name</Translate>
                </Label>
                <AvField
                  id="receiver-resource-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
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
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') }
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
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="postedDateLabel" for="receiver-resource-postedDate">
                  <Translate contentKey="crownApp.receiverResource.postedDate">Posted Date</Translate>
                </Label>
                <AvField
                  id="receiver-resource-postedDate"
                  type="date"
                  className="form-control"
                  name="postedDate"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="currentStockLabel" for="receiver-resource-currentStock">
                  <Translate contentKey="crownApp.receiverResource.currentStock">Current Stock</Translate>
                </Label>
                <AvField id="receiver-resource-currentStock" type="string" className="form-control" name="currentStock" />
              </AvGroup>
              <AvGroup>
                <Label id="expirationLabel" for="receiver-resource-expiration">
                  <Translate contentKey="crownApp.receiverResource.expiration">Expiration</Translate>
                </Label>
                <AvField id="receiver-resource-expiration" type="date" className="form-control" name="expiration" />
              </AvGroup>
              <AvGroup>
                <Label id="notesLabel" for="receiver-resource-notes">
                  <Translate contentKey="crownApp.receiverResource.notes">Notes</Translate>
                </Label>
                <AvField id="receiver-resource-notes" type="text" name="notes" />
              </AvGroup>
              <AvGroup>
                <Label for="receiver-resource-resourceType">
                  <Translate contentKey="crownApp.receiverResource.resourceType">Resource Type</Translate>
                </Label>
                <AvInput id="receiver-resource-resourceType" type="select" className="form-control" name="resourceType.id">
                  <option value="" key="0" />
                  {resourceTypes
                    ? resourceTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="receiver-resource-receiver">
                  <Translate contentKey="crownApp.receiverResource.receiver">Receiver</Translate>
                </Label>
                <AvInput id="receiver-resource-receiver" type="select" className="form-control" name="receiver.id">
                  <option value="" key="0" />
                  {receiverSuppliers
                    ? receiverSuppliers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/receiver-resource" replace color="info">
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
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  resourceTypes: storeState.resourceType.entities,
  receiverSuppliers: storeState.receiverSupplier.entities,
  receiverResourceEntity: storeState.receiverResource.entity,
  loading: storeState.receiverResource.loading,
  updating: storeState.receiverResource.updating,
  updateSuccess: storeState.receiverResource.updateSuccess
});

const mapDispatchToProps = {
  getResourceTypes,
  getReceiverSuppliers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReceiverResourceUpdate);
