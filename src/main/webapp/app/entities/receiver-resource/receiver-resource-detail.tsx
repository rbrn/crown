import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './receiver-resource.reducer';
import { IReceiverResource } from 'app/shared/model/receiver-resource.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReceiverResourceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReceiverResourceDetail = (props: IReceiverResourceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { receiverResourceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="crownApp.receiverResource.detail.title">ReceiverResource</Translate> [<b>{receiverResourceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="crownApp.receiverResource.name">Name</Translate>
            </span>
          </dt>
          <dd>{receiverResourceEntity.name}</dd>
          <dt>
            <span id="quantity">
              <Translate contentKey="crownApp.receiverResource.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{receiverResourceEntity.quantity}</dd>
          <dt>
            <span id="dailyUse">
              <Translate contentKey="crownApp.receiverResource.dailyUse">Daily Use</Translate>
            </span>
          </dt>
          <dd>{receiverResourceEntity.dailyUse}</dd>
          <dt>
            <span id="postedDate">
              <Translate contentKey="crownApp.receiverResource.postedDate">Posted Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={receiverResourceEntity.postedDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="currentStock">
              <Translate contentKey="crownApp.receiverResource.currentStock">Current Stock</Translate>
            </span>
          </dt>
          <dd>{receiverResourceEntity.currentStock}</dd>
          <dt>
            <span id="expiration">
              <Translate contentKey="crownApp.receiverResource.expiration">Expiration</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={receiverResourceEntity.expiration} type="date" format={APP_LOCAL_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="notes">
              <Translate contentKey="crownApp.receiverResource.notes">Notes</Translate>
            </span>
          </dt>
          <dd>{receiverResourceEntity.notes}</dd>
          <dt>
            <Translate contentKey="crownApp.receiverResource.resourceType">Resource Type</Translate>
          </dt>
          <dd>{receiverResourceEntity.resourceType ? receiverResourceEntity.resourceType.name : ''}</dd>
          <dt>
            <Translate contentKey="crownApp.receiverResource.receiver">Receiver</Translate>
          </dt>
          <dd>{receiverResourceEntity.receiver ? receiverResourceEntity.receiver.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/receiver-resource" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/receiver-resource/${receiverResourceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ receiverResource }: IRootState) => ({
  receiverResourceEntity: receiverResource.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReceiverResourceDetail);
