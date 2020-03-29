import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './supply-point.reducer';
import { ISupplyPoint } from 'app/shared/model/supply-point.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISupplyPointDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SupplyPointDetail = (props: ISupplyPointDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { supplyPointEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="crownApp.supplyPoint.detail.title">SupplyPoint</Translate> [<b>{supplyPointEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="crownApp.supplyPoint.name">Name</Translate>
            </span>
          </dt>
          <dd>{supplyPointEntity.name}</dd>
          <dt>
            <span id="address">
              <Translate contentKey="crownApp.supplyPoint.address">Address</Translate>
            </span>
          </dt>
          <dd>{supplyPointEntity.address}</dd>
          <dt>
            <span id="primaryContactName">
              <Translate contentKey="crownApp.supplyPoint.primaryContactName">Primary Contact Name</Translate>
            </span>
          </dt>
          <dd>{supplyPointEntity.primaryContactName}</dd>
          <dt>
            <span id="zip">
              <Translate contentKey="crownApp.supplyPoint.zip">Zip</Translate>
            </span>
          </dt>
          <dd>{supplyPointEntity.zip}</dd>
          <dt>
            <span id="phoneNumber">
              <Translate contentKey="crownApp.supplyPoint.phoneNumber">Phone Number</Translate>
            </span>
          </dt>
          <dd>{supplyPointEntity.phoneNumber}</dd>
          <dt>
            <span id="latitude">
              <Translate contentKey="crownApp.supplyPoint.latitude">Latitude</Translate>
            </span>
          </dt>
          <dd>{supplyPointEntity.latitude}</dd>
          <dt>
            <span id="longitude">
              <Translate contentKey="crownApp.supplyPoint.longitude">Longitude</Translate>
            </span>
          </dt>
          <dd>{supplyPointEntity.longitude}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="crownApp.supplyPoint.city">City</Translate>
            </span>
          </dt>
          <dd>{supplyPointEntity.city}</dd>
          <dt>
            <span id="state">
              <Translate contentKey="crownApp.supplyPoint.state">State</Translate>
            </span>
          </dt>
          <dd>{supplyPointEntity.state}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="crownApp.supplyPoint.email">Email</Translate>
            </span>
          </dt>
          <dd>{supplyPointEntity.email}</dd>
          <dt>
            <span id="isDistributor">
              <Translate contentKey="crownApp.supplyPoint.isDistributor">Is Distributor</Translate>
            </span>
          </dt>
          <dd>{supplyPointEntity.isDistributor ? 'true' : 'false'}</dd>
          <dt>
            <span id="isHealthcare">
              <Translate contentKey="crownApp.supplyPoint.isHealthcare">Is Healthcare</Translate>
            </span>
          </dt>
          <dd>{supplyPointEntity.isHealthcare ? 'true' : 'false'}</dd>
          <dt>
            <span id="hasSterilization">
              <Translate contentKey="crownApp.supplyPoint.hasSterilization">Has Sterilization</Translate>
            </span>
          </dt>
          <dd>{supplyPointEntity.hasSterilization ? 'true' : 'false'}</dd>
          <dt>
            <span id="priority">
              <Translate contentKey="crownApp.supplyPoint.priority">Priority</Translate>
            </span>
          </dt>
          <dd>{supplyPointEntity.priority}</dd>
          <dt>
            <span id="notes">
              <Translate contentKey="crownApp.supplyPoint.notes">Notes</Translate>
            </span>
          </dt>
          <dd>{supplyPointEntity.notes}</dd>
        </dl>
        <Button tag={Link} to="/supply-point" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/supply-point/${supplyPointEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ supplyPoint }: IRootState) => ({
  supplyPointEntity: supplyPoint.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SupplyPointDetail);
