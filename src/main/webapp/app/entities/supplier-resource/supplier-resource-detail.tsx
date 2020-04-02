import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './supplier-resource.reducer';
import { ISupplierResource } from 'app/shared/model/supplier-resource.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISupplierResourceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SupplierResourceDetail = (props: ISupplierResourceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { supplierResourceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="crownApp.supplierResource.detail.title">SupplierResource</Translate> [<b>{supplierResourceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="quantity">
              <Translate contentKey="crownApp.supplierResource.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{supplierResourceEntity.quantity}</dd>
          <dt>
            <span id="cost">
              <Translate contentKey="crownApp.supplierResource.cost">Cost</Translate>
            </span>
          </dt>
          <dd>{supplierResourceEntity.cost}</dd>
        </dl>
        <Button tag={Link} to="/supplier-resource" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/supplier-resource/${supplierResourceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ supplierResource }: IRootState) => ({
  supplierResourceEntity: supplierResource.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SupplierResourceDetail);
