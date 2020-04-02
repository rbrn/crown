import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './reciever-resource.reducer';
import { IRecieverResource } from 'app/shared/model/reciever-resource.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRecieverResourceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const RecieverResourceDetail = (props: IRecieverResourceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { recieverResourceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="crownApp.recieverResource.detail.title">RecieverResource</Translate> [<b>{recieverResourceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="crownApp.recieverResource.name">Name</Translate>
            </span>
          </dt>
          <dd>{recieverResourceEntity.name}</dd>
          <dt>
            <span id="quantity">
              <Translate contentKey="crownApp.recieverResource.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{recieverResourceEntity.quantity}</dd>
          <dt>
            <span id="dailyUse">
              <Translate contentKey="crownApp.recieverResource.dailyUse">Daily Use</Translate>
            </span>
          </dt>
          <dd>{recieverResourceEntity.dailyUse}</dd>
          <dt>
            <span id="currentStock">
              <Translate contentKey="crownApp.recieverResource.currentStock">Current Stock</Translate>
            </span>
          </dt>
          <dd>{recieverResourceEntity.currentStock}</dd>
          <dt>
            <span id="notes">
              <Translate contentKey="crownApp.recieverResource.notes">Notes</Translate>
            </span>
          </dt>
          <dd>{recieverResourceEntity.notes}</dd>
        </dl>
        <Button tag={Link} to="/reciever-resource" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/reciever-resource/${recieverResourceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ recieverResource }: IRootState) => ({
  recieverResourceEntity: recieverResource.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RecieverResourceDetail);
