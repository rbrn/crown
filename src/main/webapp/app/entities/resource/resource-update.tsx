import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ISupplyPointResource } from 'app/shared/model/supply-point-resource.model';
import { getEntities as getSupplyPointResources } from 'app/entities/supply-point-resource/supply-point-resource.reducer';
import { getEntity, updateEntity, createEntity, reset } from './resource.reducer';
import { IResource } from 'app/shared/model/resource.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IResourceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ResourceUpdate = (props: IResourceUpdateProps) => {
  const [supplyPointResourceId, setSupplyPointResourceId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { resourceEntity, supplyPointResources, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/resource');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getSupplyPointResources();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...resourceEntity,
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
          <h2 id="crownApp.resource.home.createOrEditLabel">
            <Translate contentKey="crownApp.resource.home.createOrEditLabel">Create or edit a Resource</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : resourceEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="resource-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="resource-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="resource-name">
                  <Translate contentKey="crownApp.resource.name">Name</Translate>
                </Label>
                <AvField
                  id="resource-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="notesLabel" for="resource-notes">
                  <Translate contentKey="crownApp.resource.notes">Notes</Translate>
                </Label>
                <AvField id="resource-notes" type="text" name="notes" />
              </AvGroup>
              <AvGroup>
                <Label for="resource-supplyPointResource">
                  <Translate contentKey="crownApp.resource.supplyPointResource">Supply Point Resource</Translate>
                </Label>
                <AvInput id="resource-supplyPointResource" type="select" className="form-control" name="supplyPointResource.id">
                  <option value="" key="0" />
                  {supplyPointResources
                    ? supplyPointResources.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/resource" replace color="info">
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
  supplyPointResources: storeState.supplyPointResource.entities,
  resourceEntity: storeState.resource.entity,
  loading: storeState.resource.loading,
  updating: storeState.resource.updating,
  updateSuccess: storeState.resource.updateSuccess
});

const mapDispatchToProps = {
  getSupplyPointResources,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ResourceUpdate);
