import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './reciever-resource.reducer';
import { IRecieverResource } from 'app/shared/model/reciever-resource.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IRecieverResourceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RecieverResourceUpdate = (props: IRecieverResourceUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { recieverResourceEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/reciever-resource');
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
        ...recieverResourceEntity,
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
          <h2 id="crownApp.recieverResource.home.createOrEditLabel">
            <Translate contentKey="crownApp.recieverResource.home.createOrEditLabel">Create or edit a RecieverResource</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : recieverResourceEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="reciever-resource-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="reciever-resource-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="reciever-resource-name">
                  <Translate contentKey="crownApp.recieverResource.name">Name</Translate>
                </Label>
                <AvField
                  id="reciever-resource-name"
                  type="text"
                  name="name"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label id="quantityLabel" for="reciever-resource-quantity">
                  <Translate contentKey="crownApp.recieverResource.quantity">Quantity</Translate>
                </Label>
                <AvField
                  id="reciever-resource-quantity"
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
                <Label id="dailyUseLabel" for="reciever-resource-dailyUse">
                  <Translate contentKey="crownApp.recieverResource.dailyUse">Daily Use</Translate>
                </Label>
                <AvField
                  id="reciever-resource-dailyUse"
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
                <Label id="currentStockLabel" for="reciever-resource-currentStock">
                  <Translate contentKey="crownApp.recieverResource.currentStock">Current Stock</Translate>
                </Label>
                <AvField id="reciever-resource-currentStock" type="string" className="form-control" name="currentStock" />
              </AvGroup>
              <AvGroup>
                <Label id="notesLabel" for="reciever-resource-notes">
                  <Translate contentKey="crownApp.recieverResource.notes">Notes</Translate>
                </Label>
                <AvField id="reciever-resource-notes" type="text" name="notes" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/reciever-resource" replace color="info">
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
  recieverResourceEntity: storeState.recieverResource.entity,
  loading: storeState.recieverResource.loading,
  updating: storeState.recieverResource.updating,
  updateSuccess: storeState.recieverResource.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RecieverResourceUpdate);
