import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IResourceType } from 'app/shared/model/resource-type.model';
import { getEntities as getResourceTypes } from 'app/entities/resource-type/resource-type.reducer';
import { IReceiverSupplier } from 'app/shared/model/receiver-supplier.model';
import { getEntities as getReceiverSuppliers } from 'app/entities/receiver-supplier/receiver-supplier.reducer';
import { getEntity, updateEntity, createEntity, reset } from './supplier-resource.reducer';
import { ISupplierResource } from 'app/shared/model/supplier-resource.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISupplierResourceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SupplierResourceUpdate = (props: ISupplierResourceUpdateProps) => {
  const [resourceTypeId, setResourceTypeId] = useState('0');
  const [supplierId, setSupplierId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { supplierResourceEntity, resourceTypes, receiverSuppliers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/supplier-resource');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getResourceTypes();
    props.getReceiverSuppliers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...supplierResourceEntity,
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
          <h2 id="crownApp.supplierResource.home.createOrEditLabel">
            <Translate contentKey="crownApp.supplierResource.home.createOrEditLabel">Create or edit a SupplierResource</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : supplierResourceEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="supplier-resource-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="supplier-resource-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="quantityLabel" for="supplier-resource-quantity">
                  <Translate contentKey="crownApp.supplierResource.quantity">Quantity</Translate>
                </Label>
                <AvField
                  id="supplier-resource-quantity"
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
                <Label id="costLabel" for="supplier-resource-cost">
                  <Translate contentKey="crownApp.supplierResource.cost">Cost</Translate>
                </Label>
                <AvField
                  id="supplier-resource-cost"
                  type="string"
                  className="form-control"
                  name="cost"
                  validate={{
                    required: { value: true, errorMessage: translate('entity.validation.required') },
                    number: { value: true, errorMessage: translate('entity.validation.number') }
                  }}
                />
              </AvGroup>
              <AvGroup>
                <Label for="supplier-resource-resourceType">
                  <Translate contentKey="crownApp.supplierResource.resourceType">Resource Type</Translate>
                </Label>
                <AvInput id="supplier-resource-resourceType" type="select" className="form-control" name="resourceType.id">
                  <option value="" key="0" />
                  {resourceTypes
                    ? resourceTypes.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="supplier-resource-supplier">
                  <Translate contentKey="crownApp.supplierResource.supplier">Supplier</Translate>
                </Label>
                <AvInput id="supplier-resource-supplier" type="select" className="form-control" name="supplier.id">
                  <option value="" key="0" />
                  {receiverSuppliers
                    ? receiverSuppliers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/supplier-resource" replace color="info">
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
  resourceTypes: storeState.resourceType.entities,
  receiverSuppliers: storeState.receiverSupplier.entities,
  supplierResourceEntity: storeState.supplierResource.entity,
  loading: storeState.supplierResource.loading,
  updating: storeState.supplierResource.updating,
  updateSuccess: storeState.supplierResource.updateSuccess
});

const mapDispatchToProps = {
  getResourceTypes,
  getReceiverSuppliers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SupplierResourceUpdate);
