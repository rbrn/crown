import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './resource.reducer';
import { IResource } from 'app/shared/model/resource.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IResourceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ResourceDetail = (props: IResourceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { resourceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="crownApp.resource.detail.title">Resource</Translate> [<b>{resourceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="crownApp.resource.name">Name</Translate>
            </span>
          </dt>
          <dd>{resourceEntity.name}</dd>
          <dt>
            <span id="notes">
              <Translate contentKey="crownApp.resource.notes">Notes</Translate>
            </span>
          </dt>
          <dd>{resourceEntity.notes}</dd>
          <dt>
            <Translate contentKey="crownApp.resource.supplyPointResource">Supply Point Resource</Translate>
          </dt>
          <dd>{resourceEntity.supplyPointResource ? resourceEntity.supplyPointResource.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/resource" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/resource/${resourceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ resource }: IRootState) => ({
  resourceEntity: resource.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ResourceDetail);
