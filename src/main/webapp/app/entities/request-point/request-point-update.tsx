import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './request-point.reducer';
import { IRequestPoint } from 'app/shared/model/request-point.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRequestPointUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RequestPointUpdate = (props: IRequestPointUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { requestPointEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/request-point');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
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
        ...requestPointEntity,
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
          <h2 id="crownApp.requestPoint.home.createOrEditLabel">
            <Translate contentKey="crownApp.requestPoint.home.createOrEditLabel">Create or edit a RequestPoint</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : requestPointEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="request-point-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="request-point-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="request-point-name">
                  <Translate contentKey="crownApp.requestPoint.name">Name</Translate>
                </Label>
                <AvField
                  id="request-point-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="request-point-address">
                  <Translate contentKey="crownApp.requestPoint.address">Address</Translate>
                </Label>
                <AvField id="request-point-address" type="text" name="address" />
              </AvGroup>
              <AvGroup>
                <Label id="primaryContactNameLabel" for="request-point-primaryContactName">
                  <Translate contentKey="crownApp.requestPoint.primaryContactName">Primary Contact Name</Translate>
                </Label>
                <AvField
                  id="request-point-primaryContactName"
                  type="text"
                  name="primaryContactName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="zipLabel" for="request-point-zip">
                  <Translate contentKey="crownApp.requestPoint.zip">Zip</Translate>
                </Label>
                <AvField
                  id="request-point-zip"
                  type="text"
                  name="zip"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="phonenumberLabel" for="request-point-phonenumber">
                  <Translate contentKey="crownApp.requestPoint.phonenumber">Phonenumber</Translate>
                </Label>
                <AvField id="request-point-phonenumber" type="text" name="phonenumber" />
              </AvGroup>
              <AvGroup>
                <Label id="latxLabel" for="request-point-latx">
                  <Translate contentKey="crownApp.requestPoint.latx">Latx</Translate>
                </Label>
                <AvField id="request-point-latx" type="string" className="form-control" name="latx" />
              </AvGroup>
              <AvGroup>
                <Label id="longyLabel" for="request-point-longy">
                  <Translate contentKey="crownApp.requestPoint.longy">Longy</Translate>
                </Label>
                <AvField id="request-point-longy" type="string" className="form-control" name="longy" />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="request-point-city">
                  <Translate contentKey="crownApp.requestPoint.city">City</Translate>
                </Label>
                <AvField id="request-point-city" type="text" name="city" />
              </AvGroup>
              <AvGroup>
                <Label id="stateLabel" for="request-point-state">
                  <Translate contentKey="crownApp.requestPoint.state">State</Translate>
                </Label>
                <AvField id="request-point-state" type="text" name="state" />
              </AvGroup>
              <AvGroup check>
                <Label id="isDistributorLabel">
                  <AvInput id="request-point-isDistributor" type="checkbox" className="form-check-input" name="isDistributor" />
                  <Translate contentKey="crownApp.requestPoint.isDistributor">Is Distributor</Translate>
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="isHealthcareLabel">
                  <AvInput id="request-point-isHealthcare" type="checkbox" className="form-check-input" name="isHealthcare" />
                  <Translate contentKey="crownApp.requestPoint.isHealthcare">Is Healthcare</Translate>
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="hasSterilizationLabel">
                  <AvInput id="request-point-hasSterilization" type="checkbox" className="form-check-input" name="hasSterilization" />
                  <Translate contentKey="crownApp.requestPoint.hasSterilization">Has Sterilization</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="priorityLabel" for="request-point-priority">
                  <Translate contentKey="crownApp.requestPoint.priority">Priority</Translate>
                </Label>
                <AvField id="request-point-priority" type="string" className="form-control" name="priority" />
              </AvGroup>
              <AvGroup>
                <Label id="notesLabel" for="request-point-notes">
                  <Translate contentKey="crownApp.requestPoint.notes">Notes</Translate>
                </Label>
                <AvField id="request-point-notes" type="text" name="notes" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/request-point" replace color="info">
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
  requestPointEntity: storeState.requestPoint.entity,
  loading: storeState.requestPoint.loading,
  updating: storeState.requestPoint.updating,
  updateSuccess: storeState.requestPoint.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RequestPointUpdate);
