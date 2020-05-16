import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './receiver-supplier.reducer';
import { IReceiverSupplier } from 'app/shared/model/receiver-supplier.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IReceiverSupplierUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReceiverSupplierUpdate = (props: IReceiverSupplierUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { receiverSupplierEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/receiver-supplier');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...receiverSupplierEntity,
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
          <h2 id="crownApp.receiverSupplier.home.createOrEditLabel">
            <Translate contentKey="crownApp.receiverSupplier.home.createOrEditLabel">Create or edit a Receiver Supplier</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : receiverSupplierEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="receiver-supplier-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="receiver-supplier-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="receiver-supplier-name">
                  <Translate contentKey="crownApp.receiverSupplier.name">Name</Translate>
                </Label>
                <AvField
                  id="receiver-supplier-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="receiver-supplier-address">
                  <Translate contentKey="crownApp.receiverSupplier.address">Address</Translate>
                </Label>
                <AvField
                  id="receiver-supplier-address"
                  type="text"
                  name="address"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="receiver-supplier-email">
                  <Translate contentKey="crownApp.receiverSupplier.email">Email</Translate>
                </Label>
                <AvField
                  id="receiver-supplier-email"
                  type="text"
                  name="email"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="primaryContactNameLabel" for="receiver-supplier-primaryContactName">
                  <Translate contentKey="crownApp.receiverSupplier.primaryContactName">Primary Contact Name</Translate>
                </Label>
                <AvField
                  id="receiver-supplier-primaryContactName"
                  type="text"
                  name="primaryContactName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="zipLabel" for="receiver-supplier-zip">
                  <Translate contentKey="crownApp.receiverSupplier.zip">Zip</Translate>
                </Label>
                <AvField
                  id="receiver-supplier-zip"
                  type="text"
                  name="zip"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="phonenumberLabel" for="receiver-supplier-phonenumber">
                  <Translate contentKey="crownApp.receiverSupplier.phonenumber">Phonenumber</Translate>
                </Label>
                <AvField
                  id="receiver-supplier-phonenumber"
                  type="text"
                  name="phonenumber"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="latxLabel" for="receiver-supplier-latx">
                  <Translate contentKey="crownApp.receiverSupplier.latx">Latx</Translate>
                </Label>
                <AvField id="receiver-supplier-latx" type="string" className="form-control" name="latx" />
              </AvGroup>
              <AvGroup>
                <Label id="longyLabel" for="receiver-supplier-longy">
                  <Translate contentKey="crownApp.receiverSupplier.longy">Longy</Translate>
                </Label>
                <AvField id="receiver-supplier-longy" type="string" className="form-control" name="longy" />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="receiver-supplier-city">
                  <Translate contentKey="crownApp.receiverSupplier.city">City</Translate>
                </Label>
                <AvField
                  id="receiver-supplier-city"
                  type="text"
                  name="city"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="stateLabel" for="receiver-supplier-state">
                  <Translate contentKey="crownApp.receiverSupplier.state">State</Translate>
                </Label>
                <AvField
                  id="receiver-supplier-state"
                  type="text"
                  name="state"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="countryLabel" for="receiver-supplier-country">
                  <Translate contentKey="crownApp.receiverSupplier.country">Country</Translate>
                </Label>
                <AvField
                  id="receiver-supplier-country"
                  type="text"
                  name="country"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="npiLabel" for="receiver-supplier-npi">
                  <Translate contentKey="crownApp.receiverSupplier.npi">Npi</Translate>
                </Label>
                <AvField id="receiver-supplier-npi" type="string" className="form-control" name="npi" />
              </AvGroup>
              <AvGroup check>
                <Label id="isReceiverLabel">
                  <AvInput id="receiver-supplier-isReceiver" type="checkbox" className="form-check-input" name="isReceiver" />
                  <Translate contentKey="crownApp.receiverSupplier.isReceiver">Is Receiver</Translate>
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="isSupplierLabel">
                  <AvInput id="receiver-supplier-isSupplier" type="checkbox" className="form-check-input" name="isSupplier" />
                  <Translate contentKey="crownApp.receiverSupplier.isSupplier">Is Supplier</Translate>
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="hasSterilizationLabel">
                  <AvInput id="receiver-supplier-hasSterilization" type="checkbox" className="form-check-input" name="hasSterilization" />
                  <Translate contentKey="crownApp.receiverSupplier.hasSterilization">Has Sterilization</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="priorityLabel" for="receiver-supplier-priority">
                  <Translate contentKey="crownApp.receiverSupplier.priority">Priority</Translate>
                </Label>
                <AvField id="receiver-supplier-priority" type="string" className="form-control" name="priority" />
              </AvGroup>
              <AvGroup>
                <Label id="notesLabel" for="receiver-supplier-notes">
                  <Translate contentKey="crownApp.receiverSupplier.notes">Notes</Translate>
                </Label>
                <AvField id="receiver-supplier-notes" type="text" name="notes" />
              </AvGroup>
              <AvGroup>
                <Label id="tagsLabel" for="receiver-supplier-tags">
                  <Translate contentKey="crownApp.receiverSupplier.tags">Tags</Translate>
                </Label>
                <AvField id="receiver-supplier-tags" type="text" name="tags" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/receiver-supplier" replace color="info">
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
  receiverSupplierEntity: storeState.receiverSupplier.entity,
  loading: storeState.receiverSupplier.loading,
  updating: storeState.receiverSupplier.updating,
  updateSuccess: storeState.receiverSupplier.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReceiverSupplierUpdate);
