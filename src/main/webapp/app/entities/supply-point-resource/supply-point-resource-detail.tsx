import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './supply-point-resource.reducer';
import { ISupplyPointResource } from 'app/shared/model/supply-point-resource.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISupplyPointResourceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SupplyPointResourceDetail = (props: ISupplyPointResourceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { supplyPointResourceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="crownApp.supplyPointResource.detail.title">SupplyPointResource</Translate> [
          <b>{supplyPointResourceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="numRequested">
              <Translate contentKey="crownApp.supplyPointResource.numRequested">Num Requested</Translate>
            </span>
          </dt>
          <dd>{supplyPointResourceEntity.numRequested}</dd>
          <dt>
            <span id="canProduce">
              <Translate contentKey="crownApp.supplyPointResource.canProduce">Can Produce</Translate>
            </span>
          </dt>
          <dd>{supplyPointResourceEntity.canProduce}</dd>
          <dt>
            <span id="numinStock">
              <Translate contentKey="crownApp.supplyPointResource.numinStock">Numin Stock</Translate>
            </span>
          </dt>
          <dd>{supplyPointResourceEntity.numinStock}</dd>
          <dt>
            <Translate contentKey="crownApp.supplyPointResource.supplypoint">Supplypoint</Translate>
          </dt>
          <dd>{supplyPointResourceEntity.supplypoint ? supplyPointResourceEntity.supplypoint.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/supply-point-resource" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/supply-point-resource/${supplyPointResourceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ supplyPointResource }: IRootState) => ({
  supplyPointResourceEntity: supplyPointResource.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SupplyPointResourceDetail);
