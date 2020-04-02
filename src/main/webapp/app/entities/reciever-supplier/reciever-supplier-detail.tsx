import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './reciever-supplier.reducer';
import { IRecieverSupplier } from 'app/shared/model/reciever-supplier.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRecieverSupplierDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RecieverSupplierDetail = (props: IRecieverSupplierDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { recieverSupplierEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="crownApp.recieverSupplier.detail.title">RecieverSupplier</Translate> [<b>{recieverSupplierEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="crownApp.recieverSupplier.name">Name</Translate>
            </span>
          </dt>
          <dd>{recieverSupplierEntity.name}</dd>
          <dt>
            <span id="address">
              <Translate contentKey="crownApp.recieverSupplier.address">Address</Translate>
            </span>
          </dt>
          <dd>{recieverSupplierEntity.address}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="crownApp.recieverSupplier.email">Email</Translate>
            </span>
          </dt>
          <dd>{recieverSupplierEntity.email}</dd>
          <dt>
            <span id="primaryContactName">
              <Translate contentKey="crownApp.recieverSupplier.primaryContactName">Primary Contact Name</Translate>
            </span>
          </dt>
          <dd>{recieverSupplierEntity.primaryContactName}</dd>
          <dt>
            <span id="zip">
              <Translate contentKey="crownApp.recieverSupplier.zip">Zip</Translate>
            </span>
          </dt>
          <dd>{recieverSupplierEntity.zip}</dd>
          <dt>
            <span id="phonenumber">
              <Translate contentKey="crownApp.recieverSupplier.phonenumber">Phonenumber</Translate>
            </span>
          </dt>
          <dd>{recieverSupplierEntity.phonenumber}</dd>
          <dt>
            <span id="latx">
              <Translate contentKey="crownApp.recieverSupplier.latx">Latx</Translate>
            </span>
          </dt>
          <dd>{recieverSupplierEntity.latx}</dd>
          <dt>
            <span id="longy">
              <Translate contentKey="crownApp.recieverSupplier.longy">Longy</Translate>
            </span>
          </dt>
          <dd>{recieverSupplierEntity.longy}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="crownApp.recieverSupplier.city">City</Translate>
            </span>
          </dt>
          <dd>{recieverSupplierEntity.city}</dd>
          <dt>
            <span id="state">
              <Translate contentKey="crownApp.recieverSupplier.state">State</Translate>
            </span>
          </dt>
          <dd>{recieverSupplierEntity.state}</dd>
          <dt>
            <span id="country">
              <Translate contentKey="crownApp.recieverSupplier.country">Country</Translate>
            </span>
          </dt>
          <dd>{recieverSupplierEntity.country}</dd>
          <dt>
            <span id="npi">
              <Translate contentKey="crownApp.recieverSupplier.npi">Npi</Translate>
            </span>
          </dt>
          <dd>{recieverSupplierEntity.npi}</dd>
          <dt>
            <span id="isReceiver">
              <Translate contentKey="crownApp.recieverSupplier.isReceiver">Is Receiver</Translate>
            </span>
          </dt>
          <dd>{recieverSupplierEntity.isReceiver ? 'true' : 'false'}</dd>
          <dt>
            <span id="isSupplier">
              <Translate contentKey="crownApp.recieverSupplier.isSupplier">Is Supplier</Translate>
            </span>
          </dt>
          <dd>{recieverSupplierEntity.isSupplier ? 'true' : 'false'}</dd>
          <dt>
            <span id="hasSterilization">
              <Translate contentKey="crownApp.recieverSupplier.hasSterilization">Has Sterilization</Translate>
            </span>
          </dt>
          <dd>{recieverSupplierEntity.hasSterilization ? 'true' : 'false'}</dd>
          <dt>
            <span id="priority">
              <Translate contentKey="crownApp.recieverSupplier.priority">Priority</Translate>
            </span>
          </dt>
          <dd>{recieverSupplierEntity.priority}</dd>
          <dt>
            <span id="notes">
              <Translate contentKey="crownApp.recieverSupplier.notes">Notes</Translate>
            </span>
          </dt>
          <dd>{recieverSupplierEntity.notes}</dd>
        </dl>
        <Button tag={Link} to="/reciever-supplier" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/reciever-supplier/${recieverSupplierEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ recieverSupplier }: IRootState) => ({
  recieverSupplierEntity: recieverSupplier.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RecieverSupplierDetail);
