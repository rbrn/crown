import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './request-point.reducer';
import { IRequestPoint } from 'app/shared/model/request-point.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRequestPointDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RequestPointDetail = (props: IRequestPointDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { requestPointEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="crownApp.requestPoint.detail.title">RequestPoint</Translate> [<b>{requestPointEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="crownApp.requestPoint.name">Name</Translate>
            </span>
          </dt>
          <dd>{requestPointEntity.name}</dd>
          <dt>
            <span id="address">
              <Translate contentKey="crownApp.requestPoint.address">Address</Translate>
            </span>
          </dt>
          <dd>{requestPointEntity.address}</dd>
          <dt>
            <span id="primaryContactName">
              <Translate contentKey="crownApp.requestPoint.primaryContactName">Primary Contact Name</Translate>
            </span>
          </dt>
          <dd>{requestPointEntity.primaryContactName}</dd>
          <dt>
            <span id="zip">
              <Translate contentKey="crownApp.requestPoint.zip">Zip</Translate>
            </span>
          </dt>
          <dd>{requestPointEntity.zip}</dd>
          <dt>
            <span id="phonenumber">
              <Translate contentKey="crownApp.requestPoint.phonenumber">Phonenumber</Translate>
            </span>
          </dt>
          <dd>{requestPointEntity.phonenumber}</dd>
          <dt>
            <span id="latx">
              <Translate contentKey="crownApp.requestPoint.latx">Latx</Translate>
            </span>
          </dt>
          <dd>{requestPointEntity.latx}</dd>
          <dt>
            <span id="longy">
              <Translate contentKey="crownApp.requestPoint.longy">Longy</Translate>
            </span>
          </dt>
          <dd>{requestPointEntity.longy}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="crownApp.requestPoint.city">City</Translate>
            </span>
          </dt>
          <dd>{requestPointEntity.city}</dd>
          <dt>
            <span id="state">
              <Translate contentKey="crownApp.requestPoint.state">State</Translate>
            </span>
          </dt>
          <dd>{requestPointEntity.state}</dd>
          <dt>
            <span id="isDistributor">
              <Translate contentKey="crownApp.requestPoint.isDistributor">Is Distributor</Translate>
            </span>
          </dt>
          <dd>{requestPointEntity.isDistributor ? 'true' : 'false'}</dd>
          <dt>
            <span id="isHealthcare">
              <Translate contentKey="crownApp.requestPoint.isHealthcare">Is Healthcare</Translate>
            </span>
          </dt>
          <dd>{requestPointEntity.isHealthcare ? 'true' : 'false'}</dd>
          <dt>
            <span id="hasSterilization">
              <Translate contentKey="crownApp.requestPoint.hasSterilization">Has Sterilization</Translate>
            </span>
          </dt>
          <dd>{requestPointEntity.hasSterilization ? 'true' : 'false'}</dd>
          <dt>
            <span id="priority">
              <Translate contentKey="crownApp.requestPoint.priority">Priority</Translate>
            </span>
          </dt>
          <dd>{requestPointEntity.priority}</dd>
          <dt>
            <span id="notes">
              <Translate contentKey="crownApp.requestPoint.notes">Notes</Translate>
            </span>
          </dt>
          <dd>{requestPointEntity.notes}</dd>
        </dl>
        <Button tag={Link} to="/request-point" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/request-point/${requestPointEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ requestPoint }: IRootState) => ({
  requestPointEntity: requestPoint.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RequestPointDetail);
