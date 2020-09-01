import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IReceiverResource } from 'app/shared/model/receiver-resource.model';
import { getEntities as getReceiverResources } from 'app/entities/receiver-resource/receiver-resource.reducer';
import { ISupplierResource } from 'app/shared/model/supplier-resource.model';
import { getEntities as getSupplierResources } from 'app/entities/supplier-resource/supplier-resource.reducer';
import { getEntity, updateEntity, createEntity, reset } from './claim.reducer';
import { IClaim } from 'app/shared/model/claim.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IClaimUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ClaimUpdate = (props: IClaimUpdateProps) => {
  const [receiverResourceId, setReceiverResourceId] = useState('0');
  const [supplierResourceId, setSupplierResourceId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { claimEntity, receiverResources, supplierResources, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/claim');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getReceiverResources();
    props.getSupplierResources();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...claimEntity,
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
            <AvForm model={isNew ? {} : claimEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="claim-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="claim-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
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
                <AvField id="claim-notes" type="text" name="notes" />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="claim-status">
                  <Translate contentKey="crownApp.claim.status">Status</Translate>
                </Label>
                <AvInput
                  id="claim-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && claimEntity.status) || 'PENDING'}
                >
                  <option value="PENDING">{translate('crownApp.ClaimStatusEnum.PENDING')}</option>
                  <option value="INREVIEW">{translate('crownApp.ClaimStatusEnum.INREVIEW')}</option>
                  <option value="ACCEPTED">{translate('crownApp.ClaimStatusEnum.ACCEPTED')}</option>
                  <option value="FORSHIPPING">{translate('crownApp.ClaimStatusEnum.FORSHIPPING')}</option>
                  <option value="SHIPPED">{translate('crownApp.ClaimStatusEnum.SHIPPED')}</option>
                  <option value="DELIVERED">{translate('crownApp.ClaimStatusEnum.DELIVERED')}</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="claim-receiverResource">
                  <Translate contentKey="crownApp.claim.receiverResource">Receiver Resource</Translate>
                </Label>
                <AvInput id="claim-receiverResource" type="select" className="form-control" name="receiverResource.id">
                  <option value="" key="0" />
                  {receiverResources
                    ? receiverResources.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="claim-supplierResource">
                  <Translate contentKey="crownApp.claim.supplierResource">Supplier Resource</Translate>
                </Label>
                <AvInput id="claim-supplierResource" type="select" className="form-control" name="supplierResource.id">
                  <option value="" key="0" />
                  {supplierResources
                    ? supplierResources.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
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
              <Button style={{backgroundColor: 'green'}} id="save-entity" type="submit" disabled={updating}>
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
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ClaimUpdate);
