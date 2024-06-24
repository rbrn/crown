import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './request.reducer';
import { IRequest } from 'app/shared/model/request.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRequestDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RequestDetail = (props: IRequestDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { requestEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="crownApp.request.detail.title">Request</Translate> [<b>{requestEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="itemType">
              <Translate contentKey="crownApp.request.itemType">Item Type</Translate>
            </span>
          </dt>
          <dd>{requestEntity.itemType}</dd>
          <dt>
            <span id="numRequested">
              <Translate contentKey="crownApp.request.numRequested">Num Requested</Translate>
            </span>
          </dt>
          <dd>{requestEntity.numRequested}</dd>
          <dt>
            <span id="dailyNeed">
              <Translate contentKey="crownApp.request.dailyNeed">Daily Need</Translate>
            </span>
          </dt>
          <dd>{requestEntity.dailyNeed}</dd>
          <dt>
            <span id="numinStock">
              <Translate contentKey="crownApp.request.numinStock">Numin Stock</Translate>
            </span>
          </dt>
          <dd>{requestEntity.numinStock}</dd>
          <dt>
            <span id="daysLeft">
              <Translate contentKey="crownApp.request.daysLeft">Days Left</Translate>
            </span>
          </dt>
          <dd>{requestEntity.daysLeft}</dd>
          <dt>
            <Translate contentKey="crownApp.request.resource">Resource</Translate>
          </dt>
          <dd>{requestEntity.resource ? requestEntity.resource.id : ''}</dd>
          <dt>
            <Translate contentKey="crownApp.request.requestPoint">Request Point</Translate>
          </dt>
          <dd>{requestEntity.requestPoint ? requestEntity.requestPoint.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/request" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/request/${requestEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ request }: IRootState) => ({
  requestEntity: request.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RequestDetail);
