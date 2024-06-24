import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './delivery.reducer';
import { IDelivery } from 'app/shared/model/delivery.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDeliveryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DeliveryDetail = (props: IDeliveryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { deliveryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="crownApp.delivery.detail.title">Delivery</Translate> [<b>{deliveryEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="deliveryContact">
              <Translate contentKey="crownApp.delivery.deliveryContact">Delivery Contact</Translate>
            </span>
          </dt>
          <dd>{deliveryEntity.deliveryContact}</dd>
          <dt>
            <span id="phoneNumber">
              <Translate contentKey="crownApp.delivery.phoneNumber">Phone Number</Translate>
            </span>
          </dt>
          <dd>{deliveryEntity.phoneNumber}</dd>
          <dt>
            <span id="notes">
              <Translate contentKey="crownApp.delivery.notes">Notes</Translate>
            </span>
          </dt>
          <dd>{deliveryEntity.notes}</dd>
        </dl>
        <Button tag={Link} to="/delivery" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/delivery/${deliveryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ delivery }: IRootState) => ({
  deliveryEntity: delivery.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryDetail);
