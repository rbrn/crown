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
import ReceiverSupplierFields from "app/entities/receiver-supplier/receiver-supplier-fields";

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
            <Translate contentKey="crownApp.receiverSupplier.home.createOrEditLabel">Create or edit a ReceiverSupplier</Translate>
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
              <ReceiverSupplierFields/>
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
