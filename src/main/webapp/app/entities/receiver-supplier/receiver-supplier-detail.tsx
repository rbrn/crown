import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './receiver-supplier.reducer';
import { IReceiverSupplier } from 'app/shared/model/receiver-supplier.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReceiverSupplierDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReceiverSupplierDetail = (props: IReceiverSupplierDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { receiverSupplierEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="crownApp.receiverSupplier.detail.title">ReceiverSupplier</Translate> [<b>{receiverSupplierEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="crownApp.receiverSupplier.name">Name</Translate>
            </span>
          </dt>
          <dd>{receiverSupplierEntity.name}</dd>
          <dt>
            <span id="address">
              <Translate contentKey="crownApp.receiverSupplier.address">Address</Translate>
            </span>
          </dt>
          <dd>{receiverSupplierEntity.address}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="crownApp.receiverSupplier.email">Email</Translate>
            </span>
          </dt>
          <dd>{receiverSupplierEntity.email}</dd>
          <dt>
            <span id="primaryContactName">
              <Translate contentKey="crownApp.receiverSupplier.primaryContactName">Primary Contact Name</Translate>
            </span>
          </dt>
          <dd>{receiverSupplierEntity.primaryContactName}</dd>
          <dt>
            <span id="zip">
              <Translate contentKey="crownApp.receiverSupplier.zip">Zip</Translate>
            </span>
          </dt>
          <dd>{receiverSupplierEntity.zip}</dd>
          <dt>
            <span id="phonenumber">
              <Translate contentKey="crownApp.receiverSupplier.phonenumber">Phonenumber</Translate>
            </span>
          </dt>
          <dd>{receiverSupplierEntity.phonenumber}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="crownApp.receiverSupplier.city">City</Translate>
            </span>
          </dt>
          <dd>{receiverSupplierEntity.city}</dd>
          <dt>
            <span id="state">
              <Translate contentKey="crownApp.receiverSupplier.state">State</Translate>
            </span>
          </dt>
          <dd>{receiverSupplierEntity.state}</dd>
          <dt>
            <span id="country">
              <Translate contentKey="crownApp.receiverSupplier.country">Country</Translate>
            </span>
          </dt>
          <dd>{receiverSupplierEntity.country}</dd>
          <dt>
            <span id="isReceiver">
              <Translate contentKey="crownApp.receiverSupplier.isReceiver">Is Receiver</Translate>
            </span>
          </dt>
          <dd>{receiverSupplierEntity.isReceiver ? 'true' : 'false'}</dd>
          <dt>
            <span id="isSupplier">
              <Translate contentKey="crownApp.receiverSupplier.isSupplier">Is Supplier</Translate>
            </span>
          </dt>
          <dd>{receiverSupplierEntity.isSupplier ? 'true' : 'false'}</dd>
          <dt>
            <span id="hasSterilization">
              <Translate contentKey="crownApp.receiverSupplier.hasSterilization">Has Sterilization</Translate>
            </span>
          </dt>
          <dd>{receiverSupplierEntity.hasSterilization ? 'true' : 'false'}</dd>
          <dt>
            <span id="priority">
              <Translate contentKey="crownApp.receiverSupplier.priority">Priority</Translate>
            </span>
          </dt>
          <dd>{receiverSupplierEntity.priority}</dd>
          <dt>
            <span id="notes">
              <Translate contentKey="crownApp.receiverSupplier.notes">Notes</Translate>
            </span>
          </dt>
          <dd>{receiverSupplierEntity.notes}</dd>
        </dl>
        <Button tag={Link} to="/receiver-supplier" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/receiver-supplier/${receiverSupplierEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ receiverSupplier }: IRootState) => ({
  receiverSupplierEntity: receiverSupplier.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReceiverSupplierDetail);
