import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './reciever-supplier.reducer';
import { IRecieverSupplier } from 'app/shared/model/reciever-supplier.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRecieverSupplierUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RecieverSupplierUpdate = (props: IRecieverSupplierUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { recieverSupplierEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/reciever-supplier');
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
        ...recieverSupplierEntity,
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
          <h2 id="crownApp.recieverSupplier.home.createOrEditLabel">
            <Translate contentKey="crownApp.recieverSupplier.home.createOrEditLabel">Create or edit a RecieverSupplier</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : recieverSupplierEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="reciever-supplier-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="reciever-supplier-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="reciever-supplier-name">
                  <Translate contentKey="crownApp.recieverSupplier.name">Name</Translate>
                </Label>
                <AvField
                  id="reciever-supplier-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="reciever-supplier-address">
                  <Translate contentKey="crownApp.recieverSupplier.address">Address</Translate>
                </Label>
                <AvField
                  id="reciever-supplier-address"
                  type="text"
                  name="address"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="reciever-supplier-email">
                  <Translate contentKey="crownApp.recieverSupplier.email">Email</Translate>
                </Label>
                <AvField
                  id="reciever-supplier-email"
                  type="text"
                  name="email"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="primaryContactNameLabel" for="reciever-supplier-primaryContactName">
                  <Translate contentKey="crownApp.recieverSupplier.primaryContactName">Primary Contact Name</Translate>
                </Label>
                <AvField
                  id="reciever-supplier-primaryContactName"
                  type="text"
                  name="primaryContactName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="zipLabel" for="reciever-supplier-zip">
                  <Translate contentKey="crownApp.recieverSupplier.zip">Zip</Translate>
                </Label>
                <AvField
                  id="reciever-supplier-zip"
                  type="text"
                  name="zip"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="phonenumberLabel" for="reciever-supplier-phonenumber">
                  <Translate contentKey="crownApp.recieverSupplier.phonenumber">Phonenumber</Translate>
                </Label>
                <AvField
                  id="reciever-supplier-phonenumber"
                  type="text"
                  name="phonenumber"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="latxLabel" for="reciever-supplier-latx">
                  <Translate contentKey="crownApp.recieverSupplier.latx">Latx</Translate>
                </Label>
                <AvField id="reciever-supplier-latx" type="string" className="form-control" name="latx" />
              </AvGroup>
              <AvGroup>
                <Label id="longyLabel" for="reciever-supplier-longy">
                  <Translate contentKey="crownApp.recieverSupplier.longy">Longy</Translate>
                </Label>
                <AvField id="reciever-supplier-longy" type="string" className="form-control" name="longy" />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="reciever-supplier-city">
                  <Translate contentKey="crownApp.recieverSupplier.city">City</Translate>
                </Label>
                <AvField
                  id="reciever-supplier-city"
                  type="text"
                  name="city"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="stateLabel" for="reciever-supplier-state">
                  <Translate contentKey="crownApp.recieverSupplier.state">State</Translate>
                </Label>
                <AvField
                  id="reciever-supplier-state"
                  type="text"
                  name="state"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="countryLabel" for="reciever-supplier-country">
                  <Translate contentKey="crownApp.recieverSupplier.country">Country</Translate>
                </Label>
                <AvField
                  id="reciever-supplier-country"
                  type="text"
                  name="country"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="npiLabel" for="reciever-supplier-npi">
                  <Translate contentKey="crownApp.recieverSupplier.npi">Npi</Translate>
                </Label>
                <AvField id="reciever-supplier-npi" type="string" className="form-control" name="npi" />
              </AvGroup>
              <AvGroup check>
                <Label id="isReceiverLabel">
                  <AvInput id="reciever-supplier-isReceiver" type="checkbox" className="form-check-input" name="isReceiver" />
                  <Translate contentKey="crownApp.recieverSupplier.isReceiver">Is Receiver</Translate>
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="isSupplierLabel">
                  <AvInput id="reciever-supplier-isSupplier" type="checkbox" className="form-check-input" name="isSupplier" />
                  <Translate contentKey="crownApp.recieverSupplier.isSupplier">Is Supplier</Translate>
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="hasSterilizationLabel">
                  <AvInput id="reciever-supplier-hasSterilization" type="checkbox" className="form-check-input" name="hasSterilization" />
                  <Translate contentKey="crownApp.recieverSupplier.hasSterilization">Has Sterilization</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="priorityLabel" for="reciever-supplier-priority">
                  <Translate contentKey="crownApp.recieverSupplier.priority">Priority</Translate>
                </Label>
                <AvField id="reciever-supplier-priority" type="string" className="form-control" name="priority" />
              </AvGroup>
              <AvGroup>
                <Label id="notesLabel" for="reciever-supplier-notes">
                  <Translate contentKey="crownApp.recieverSupplier.notes">Notes</Translate>
                </Label>
                <AvField id="reciever-supplier-notes" type="text" name="notes" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/reciever-supplier" replace color="info">
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
  recieverSupplierEntity: storeState.recieverSupplier.entity,
  loading: storeState.recieverSupplier.loading,
  updating: storeState.recieverSupplier.updating,
  updateSuccess: storeState.recieverSupplier.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RecieverSupplierUpdate);
