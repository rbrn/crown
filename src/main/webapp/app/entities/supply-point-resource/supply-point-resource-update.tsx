import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ISupplyPoint } from 'app/shared/model/supply-point.model';
import { getEntities as getSupplyPoints } from 'app/entities/supply-point/supply-point.reducer';
import { getEntity, updateEntity, createEntity, reset } from './supply-point-resource.reducer';
import { ISupplyPointResource } from 'app/shared/model/supply-point-resource.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISupplyPointResourceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SupplyPointResourceUpdate = (props: ISupplyPointResourceUpdateProps) => {
  const [supplypointId, setSupplypointId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { supplyPointResourceEntity, supplyPoints, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/supply-point-resource');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getSupplyPoints();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...supplyPointResourceEntity,
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
          <h2 id="crownApp.supplyPointResource.home.createOrEditLabel">
            <Translate contentKey="crownApp.supplyPointResource.home.createOrEditLabel">Create or edit a SupplyPointResource</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : supplyPointResourceEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="supply-point-resource-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="supply-point-resource-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="numRequestedLabel" for="supply-point-resource-numRequested">
                  <Translate contentKey="crownApp.supplyPointResource.numRequested">Num Requested</Translate>
                </Label>
                <AvField id="supply-point-resource-numRequested" type="string" className="form-control" name="numRequested" />
              </AvGroup>
              <AvGroup>
                <Label id="canProduceLabel" for="supply-point-resource-canProduce">
                  <Translate contentKey="crownApp.supplyPointResource.canProduce">Can Produce</Translate>
                </Label>
                <AvField id="supply-point-resource-canProduce" type="string" className="form-control" name="canProduce" />
              </AvGroup>
              <AvGroup>
                <Label id="numinStockLabel" for="supply-point-resource-numinStock">
                  <Translate contentKey="crownApp.supplyPointResource.numinStock">Numin Stock</Translate>
                </Label>
                <AvField id="supply-point-resource-numinStock" type="string" className="form-control" name="numinStock" />
              </AvGroup>
              <AvGroup>
                <Label for="supply-point-resource-supplypoint">
                  <Translate contentKey="crownApp.supplyPointResource.supplypoint">Supplypoint</Translate>
                </Label>
                <AvInput id="supply-point-resource-supplypoint" type="select" className="form-control" name="supplypoint.id">
                  <option value="" key="0" />
                  {supplyPoints
                    ? supplyPoints.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/supply-point-resource" replace color="info">
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
  supplyPoints: storeState.supplyPoint.entities,
  supplyPointResourceEntity: storeState.supplyPointResource.entity,
  loading: storeState.supplyPointResource.loading,
  updating: storeState.supplyPointResource.updating,
  updateSuccess: storeState.supplyPointResource.updateSuccess
});

const mapDispatchToProps = {
  getSupplyPoints,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SupplyPointResourceUpdate);
