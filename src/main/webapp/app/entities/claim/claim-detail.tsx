import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './claim.reducer';
import { IClaim } from 'app/shared/model/claim.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClaimDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ClaimDetail = (props: IClaimDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { claimEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="crownApp.claim.detail.title">Claim</Translate> [<b>{claimEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="quantity">
              <Translate contentKey="crownApp.claim.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{claimEntity.quantity}</dd>
          <dt>
            <span id="notes">
              <Translate contentKey="crownApp.claim.notes">Notes</Translate>
            </span>
          </dt>
          <dd>{claimEntity.notes}</dd>
          <dt>
            <Translate contentKey="crownApp.claim.receiverResource">Receiver Resource</Translate>
          </dt>
          <dd>{claimEntity.receiverResource ? claimEntity.receiverResource.name : ''}</dd>
          <dt>
            <Translate contentKey="crownApp.claim.supplierResource">Supplier Resource</Translate>
          </dt>
          <dd>{claimEntity.supplierResource ? claimEntity.supplierResource.name : ''}</dd>
        </dl>
        <Button tag={Link} to="/claim" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/claim/${claimEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ claim }: IRootState) => ({
  claimEntity: claim.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ClaimDetail);
