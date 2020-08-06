import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './claim.reducer';
import { IClaim } from 'app/shared/model/claim.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IClaimProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Claim = (props: IClaimProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { claimList, match, loading } = props;
  return (
    <div>
      <h2 id="claim-heading">
        <Translate contentKey="crownApp.claim.home.title">My Open Orders</Translate>
        {/* <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="crownApp.claim.home.createLabel">Create new Claim</Translate>
        </Link> */}
      </h2>
      <div className="table-responsive">
        {claimList && claimList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.claim.quantity">Quantity</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.claim.notes">Notes</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.claim.status">Status</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.claim.receiverResource">Receiver Resource</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.claim.supplierResource">Supplier Resource</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {claimList.map((claim, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${claim.id}`} color="link" size="sm">
                      {claim.id}
                    </Button>
                  </td>
                  <td>{claim.quantity}</td>
                  <td>{claim.notes}</td>
                  <td>
                    <Translate contentKey={`crownApp.ClaimStatusEnum.${claim.status}`} />
                  </td>
                  <td>
                    {claim.receiverResource ? (
                      <Link to={`receiver-resource/${claim.receiverResource.id}`}>{claim.receiverResource.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {claim.supplierResource ? (
                      <Link to={`supplier-resource/${claim.supplierResource.id}`}>{claim.supplierResource.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${claim.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${claim.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${claim.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="crownApp.claim.home.notFound">No Claims found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ claim }: IRootState) => ({
  claimList: claim.entities,
  loading: claim.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Claim);
