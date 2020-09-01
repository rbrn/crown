import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IResource } from 'app/shared/model/resource.model';
import { getEntities as getResources } from 'app/entities/resource/resource.reducer';
import { IRequestPoint } from 'app/shared/model/request-point.model';
import { getEntities as getRequestPoints } from 'app/entities/request-point/request-point.reducer';
import { getEntity, updateEntity, createEntity, reset } from './request.reducer';
import { IRequest } from 'app/shared/model/request.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRequestUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RequestUpdate = (props: IRequestUpdateProps) => {
  const [resourceId, setResourceId] = useState('0');
  const [requestPointId, setRequestPointId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { requestEntity, resources, requestPoints, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/request');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getResources();
    props.getRequestPoints();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...requestEntity,
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
          <h2 id="crownApp.request.home.createOrEditLabel">
            <Translate contentKey="crownApp.request.home.createOrEditLabel">Create or edit a Request</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : requestEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="request-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="request-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="itemTypeLabel" for="request-itemType">
                  <Translate contentKey="crownApp.request.itemType">Item Type</Translate>
                </Label>
                <AvField id="request-itemType" type="text" name="itemType" />
              </AvGroup>
              <AvGroup>
                <Label id="numRequestedLabel" for="request-numRequested">
                  <Translate contentKey="crownApp.request.numRequested">Num Requested</Translate>
                </Label>
                <AvField id="request-numRequested" type="string" className="form-control" name="numRequested" />
              </AvGroup>
              <AvGroup>
                <Label id="dailyNeedLabel" for="request-dailyNeed">
                  <Translate contentKey="crownApp.request.dailyNeed">Daily Need</Translate>
                </Label>
                <AvField id="request-dailyNeed" type="string" className="form-control" name="dailyNeed" />
              </AvGroup>
              <AvGroup>
                <Label id="numinStockLabel" for="request-numinStock">
                  <Translate contentKey="crownApp.request.numinStock">Numin Stock</Translate>
                </Label>
                <AvField id="request-numinStock" type="string" className="form-control" name="numinStock" />
              </AvGroup>
              <AvGroup>
                <Label id="daysLeftLabel" for="request-daysLeft">
                  <Translate contentKey="crownApp.request.daysLeft">Days Left</Translate>
                </Label>
                <AvField id="request-daysLeft" type="string" className="form-control" name="daysLeft" />
              </AvGroup>
              <AvGroup>
                <Label for="request-resource">
                  <Translate contentKey="crownApp.request.resource">Resource</Translate>
                </Label>
                <AvInput id="request-resource" type="select" className="form-control" name="resource.id">
                  <option value="" key="0" />
                  {resources
                    ? resources.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="request-requestPoint">
                  <Translate contentKey="crownApp.request.requestPoint">Request Point</Translate>
                </Label>
                <AvInput id="request-requestPoint" type="select" className="form-control" name="requestPoint.id">
                  <option value="" key="0" />
                  {requestPoints
                    ? requestPoints.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/request" replace color="info">
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
  resources: storeState.resource.entities,
  requestPoints: storeState.requestPoint.entities,
  requestEntity: storeState.request.entity,
  loading: storeState.request.loading,
  updating: storeState.request.updating,
  updateSuccess: storeState.request.updateSuccess
});

const mapDispatchToProps = {
  getResources,
  getRequestPoints,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RequestUpdate);
