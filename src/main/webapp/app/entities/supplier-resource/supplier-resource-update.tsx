import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Col, Label, Row} from 'reactstrap';
import {AvField, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {Translate, translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {IRootState} from 'app/shared/reducers';
import {getEntities as getResourceTypes} from 'app/entities/resource-type/resource-type.reducer';
import {getEntities as getReceiverSuppliers} from 'app/entities/receiver-supplier/receiver-supplier.reducer';
import {createEntity, getEntity, reset, updateEntity} from './supplier-resource.reducer';
import ReceiverSupplierFields from "app/entities/receiver-supplier/receiver-supplier-fields";
import UploadDocuments  from 'app/entities/supplier-resource/buyer-seller-document-component';

export interface ISupplierResourceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}

export const SupplierResourceUpdate = (props: ISupplierResourceUpdateProps) => {
  const [resourceTypeId, setResourceTypeId] = useState('0');
  const [supplierId, setSupplierId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const {supplierResourceEntity, resourceTypes, receiverSuppliers, loading, updating, account} = props;
  const supplierProfile = receiverSuppliers.filter((supplier) => (
    supplier.email === account.email && supplier.isSupplier
  ));

  let lat;
  let lng;

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

  const mayBeSupplierFields = () => {
    if (supplierProfile.length > 0) {
      return null;
    }
    return (
      <React.Fragment>
        <h2 id="crownApp.supplierResource.home.createSupplierLabel">
          <Translate contentKey="crownApp.supplierResource.home.createSupplierLabel">Who is offering this resource</Translate>
        </h2>
        <ReceiverSupplierFields fieldPrefix="supplier."/>
      </React.Fragment>
    )
  };

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...supplierResourceEntity,
        ...values
      };

      if (isNew) {
        const query = new URLSearchParams(props.location.search);
        lat = query.get('lat');
        lng = query.get('lng');
        entity.position = [lat, lng];

        if (supplierProfile.length === 0 && entity.supplier) {
          if (!entity.supplier.latx) {
            entity.supplier.latx = lat;
          }
          if (!entity.supplier.longy) {
            entity.supplier.longy = lng;
          }
        } else {
          entity.supplier = {
            email: account.email,
            latx: lat,
            longy: lng,
            name: account.firstName + " " + account.lastName,
            primaryContactName: account.email
          };
        }
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
            <Translate contentKey="crownApp.supplierResource.home.createOrEditLabel">Create or edit a
              SupplierResource</Translate>
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
                  <AvInput id="supplier-resource-id" type="text" className="form-control" name="id" required readOnly/>
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label for="supplier-resource-resourceType">
                  <Translate contentKey="crownApp.supplierResource.resourceType">Resource Type</Translate>
                </Label>
                <AvInput id="supplier-resource-resourceType" type="select" className="form-control"
                         name="resourceType.id">
                  <option value="" key="0"/>
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
                <Label id="quantityLabel" for="supplier-resource-quantity">
                  <Translate contentKey="crownApp.supplierResource.quantity"> Quantity Offering </Translate>
                </Label>
                <AvField
                  id="supplier-resource-quantity"
                  type="string"
                  className="form-control"
                  name="quantity"
                />
              </AvGroup>
              <AvGroup>
                <Label id="costLabel" for="supplier-resource-cost">
                  <Translate contentKey="crownApp.supplierResource.cost">Cost/per Unit</Translate>
                </Label>
                <AvField
                  id="supplier-resource-cost"
                  type="string"
                  className="form-control"
                  name="cost"
                  validate={{
                    required: {value: true, errorMessage: translate('entity.validation.required')},
                    number: {value: true, errorMessage: translate('entity.validation.number')}
                  }}
                />
              </AvGroup>
                <UploadDocuments/>
              {mayBeSupplierFields()}
              <Button tag={Link} id="cancel-save" to="/" replace color="info">
                <FontAwesomeIcon icon="arrow-left"/>
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save"/>
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
  updateSuccess: storeState.supplierResource.updateSuccess,
  account: storeState.authentication.account
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
