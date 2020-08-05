import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './supply-point.reducer';
import { ISupplyPoint } from 'app/shared/model/supply-point.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISupplyPointUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SupplyPointUpdate = (props: ISupplyPointUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { supplyPointEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/supply-point');
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
        ...supplyPointEntity,
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
          <h2 id="crownApp.supplyPoint.home.createOrEditLabel">
            <Translate contentKey="crownApp.supplyPoint.home.createOrEditLabel">Create or edit a SupplyPoint</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : supplyPointEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="supply-point-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="supply-point-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="supply-point-name">
                  <Translate contentKey="crownApp.supplyPoint.name">Name</Translate>
                </Label>
                <AvField
                  id="supply-point-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="supply-point-address">
                  <Translate contentKey="crownApp.supplyPoint.address">Address</Translate>
                </Label>
                <AvField id="supply-point-address" type="text" name="address" />
              </AvGroup>
              <AvGroup>
                <Label id="primaryContactNameLabel" for="supply-point-primaryContactName">
                  <Translate contentKey="crownApp.supplyPoint.primaryContactName">Primary Contact Name</Translate>
                </Label>
                <AvField
                  id="supply-point-primaryContactName"
                  type="text"
                  name="primaryContactName"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="zipLabel" for="supply-point-zip">
                  <Translate contentKey="crownApp.supplyPoint.zip">Zip</Translate>
                </Label>
                <AvField
                  id="supply-point-zip"
                  type="text"
                  name="zip"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="phonenumberLabel" for="supply-point-phonenumber">
                  <Translate contentKey="crownApp.supplyPoint.phonenumber">Phonenumber</Translate>
                </Label>
                <AvField id="supply-point-phonenumber" type="text" name="phonenumber" />
              </AvGroup>
              <AvGroup>
                <Label id="latxLabel" for="supply-point-latx">
                  <Translate contentKey="crownApp.supplyPoint.latx">Latx</Translate>
                </Label>
                <AvField id="supply-point-latx" type="string" className="form-control" name="latx" />
              </AvGroup>
              <AvGroup>
                <Label id="longyLabel" for="supply-point-longy">
                  <Translate contentKey="crownApp.supplyPoint.longy">Longy</Translate>
                </Label>
                <AvField id="supply-point-longy" type="string" className="form-control" name="longy" />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="supply-point-city">
                  <Translate contentKey="crownApp.supplyPoint.city">City</Translate>
                </Label>
                <AvField id="supply-point-city" type="text" name="city" />
              </AvGroup>
              <AvGroup>
                <Label id="stateLabel" for="supply-point-state">
                  <Translate contentKey="crownApp.supplyPoint.state">State</Translate>
                </Label>
                <AvField id="supply-point-state" type="text" name="state" />
              </AvGroup>
              <AvGroup check>
                <Label id="isDistributorLabel">
                  <AvInput id="supply-point-isDistributor" type="checkbox" className="form-check-input" name="isDistributor" />
                  <Translate contentKey="crownApp.supplyPoint.isDistributor">Is Distributor</Translate>
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="isHealthcareLabel">
                  <AvInput id="supply-point-isHealthcare" type="checkbox" className="form-check-input" name="isHealthcare" />
                  <Translate contentKey="crownApp.supplyPoint.isHealthcare">Is Healthcare</Translate>
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="hasSterilizationLabel">
                  <AvInput id="supply-point-hasSterilization" type="checkbox" className="form-check-input" name="hasSterilization" />
                  <Translate contentKey="crownApp.supplyPoint.hasSterilization">Has Sterilization</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="priorityLabel" for="supply-point-priority">
                  <Translate contentKey="crownApp.supplyPoint.priority">Priority</Translate>
                </Label>
                <AvField id="supply-point-priority" type="string" className="form-control" name="priority" />
              </AvGroup>
              <AvGroup>
                <Label id="notesLabel" for="supply-point-notes">
                  <Translate contentKey="crownApp.supplyPoint.notes">Notes</Translate>
                </Label>
                <AvField id="supply-point-notes" type="text" name="notes" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/supply-point" replace color="info">
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
  supplyPointEntity: storeState.supplyPoint.entity,
  loading: storeState.supplyPoint.loading,
  updating: storeState.supplyPoint.updating,
  updateSuccess: storeState.supplyPoint.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SupplyPointUpdate);
