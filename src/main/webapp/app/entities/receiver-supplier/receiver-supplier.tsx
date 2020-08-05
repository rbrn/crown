import React, { useState, useEffect, useRef } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, reset } from './receiver-supplier.reducer';
import { IReceiverSupplier } from 'app/shared/model/receiver-supplier.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { IHeaderProps } from 'app/shared/layout/header/header';

import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';


export interface IReceiverSupplierProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }

export const ReceiverSupplier = (props: IReceiverSupplierProps) => {
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));
  const [sorting, setSorting] = useState(false);
  const containerDiv = useRef(null);

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const resetAll = () => {
    props.reset();
    setPaginationState({
      ...paginationState,
      activePage: 1
    });
  };

  useEffect(() => {
    resetAll();
  }, []);

  useEffect(() => {
    getAllEntities();
  }, [paginationState.activePage]);

  const handleLoadMore = () => {
    setPaginationState({
      ...paginationState,
      activePage: paginationState.activePage + 1
    });
  };

  useEffect(() => {
    if (sorting) {
      getAllEntities();
      setSorting(false);
    }
  }, [sorting]);

  const sort = p => () => {
    props.reset();
    setPaginationState({
      ...paginationState,
      activePage: 1,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });
    setSorting(true);
  };

  const { receiverSupplierList, match, loading } = props;
  return (
    <div className="list-container" ref={containerDiv}>
      <h2 id="receiver-supplier-heading">
        <Translate contentKey="crownApp.receiverSupplier.home.title">Receiver Suppliers</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="crownApp.receiverSupplier.home.createLabel">Create new Receiver Supplier</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        <InfiniteScroll
          pageStart={paginationState.activePage}
          loadMore={handleLoadMore}
          hasMore={paginationState.activePage - 1 < props.links.next}
          loader={<div className="loader">Loading ...</div>}
          threshold={0}
          initialLoad={false}
          useWindow={false}
          getScrollParent={() => containerDiv.current}
        >
          {receiverSupplierList && receiverSupplierList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  {/* <th className="hand" onClick={sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th> */}

                  <th className="hand" onClick={sort('name')}>
                    <Translate contentKey="crownApp.receiverSupplier.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                  </th>

                  <th className="hand" onClick={sort('company')}>
                    <Translate contentKey="crownApp.receiverSupplier.company">Company</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  {
                    props.isAdmin &&
                    <th className="hand" onClick={sort('address')}>
                      <Translate contentKey="crownApp.receiverSupplier.address">Address</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                  }
                  {
                    props.isAdmin &&
                    <th className="hand" onClick={sort('email')}>
                      <Translate contentKey="crownApp.receiverSupplier.email">Email</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                  }
                  {
                    props.isAdmin &&
                    <th className="hand" onClick={sort('primaryContactName')}>
                      <Translate contentKey="crownApp.receiverSupplier.primaryContactName">Primary Contact Name</Translate>{' '}
                      <FontAwesomeIcon icon="sort" />
                    </th>
                  }
                  {
                    props.isAdmin &&
                    <th className="hand" onClick={sort('zip')}>
                      <Translate contentKey="crownApp.receiverSupplier.zip">Zip</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                  }
                  {
                    props.isAdmin &&
                    <th className="hand" onClick={sort('phonenumber')}>
                      <Translate contentKey="crownApp.receiverSupplier.phonenumber">Phonenumber</Translate> <FontAwesomeIcon icon="sort" />
                    </th>
                  }

                  <th className="hand" onClick={sort('city')}>
                    <Translate contentKey="crownApp.receiverSupplier.city">City</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('state')}>
                    <Translate contentKey="crownApp.receiverSupplier.state">State</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('country')}>
                    <Translate contentKey="crownApp.receiverSupplier.country">Country</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('isReceiver')}>
                    <Translate contentKey="crownApp.receiverSupplier.isReceiver">Is Receiver</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('isSupplier')}>
                    <Translate contentKey="crownApp.receiverSupplier.isSupplier">Is Supplier</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('hasSterilization')}>
                    <Translate contentKey="crownApp.receiverSupplier.hasSterilization">Has Sterilization</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('priority')}>
                    <Translate contentKey="crownApp.receiverSupplier.priority">Priority</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('notes')}>
                    <Translate contentKey="crownApp.receiverSupplier.notes">Notes</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {receiverSupplierList.map((receiverSupplier, i) => (
                  <tr key={`entity-${i}`}>
                    {/* <td>
                      <Button tag={Link} to={`${match.url}/${receiverSupplier.id}`} color="link" size="sm">
                        {receiverSupplier.id}
                      </Button>
                    </td> */}
                    <td>
                      <Button tag={Link} to={`${match.url}/${receiverSupplier.id}`} color="link" size="sm">
                        {receiverSupplier.name}
                      </Button>
                    </td>
                    <td>{receiverSupplier.company}</td>
                    {props.isAdmin && <td>{receiverSupplier.address}</td>}
                    {props.isAdmin && <td>{receiverSupplier.email}</td>}
                    {props.isAdmin && <td>{receiverSupplier.primaryContactName}</td>}
                    {props.isAdmin && <td>{receiverSupplier.zip}</td>}
                    {props.isAdmin && <td>{receiverSupplier.phonenumber}</td>}
                    <td>{receiverSupplier.city}</td>
                    <td>{receiverSupplier.state}</td>
                    <td>{receiverSupplier.country}</td>
                    <td>{receiverSupplier.isReceiver ? 'true' : 'false'}</td>
                    <td>{receiverSupplier.isSupplier ? 'true' : 'false'}</td>
                    <td>{receiverSupplier.hasSterilization ? 'true' : 'false'}</td>
                    <td>{receiverSupplier.priority}</td>
                    <td>{receiverSupplier.notes}</td>
                    {props.isAdmin &&
                      <td className="text-right">
                        <div className="btn-group flex-btn-group-container">
                          <Button tag={Link} to={`${match.url}/${receiverSupplier.id}`} color="info" size="sm">
                            <FontAwesomeIcon icon="eye" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.view">View</Translate>
                            </span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${receiverSupplier.id}/edit`} color="primary" size="sm">
                            <FontAwesomeIcon icon="pencil-alt" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.edit">Edit</Translate>
                            </span>
                          </Button>
                          <Button tag={Link} to={`${match.url}/${receiverSupplier.id}/delete`} color="danger" size="sm">
                            <FontAwesomeIcon icon="trash" />{' '}
                            <span className="d-none d-md-inline">
                              <Translate contentKey="entity.action.delete">Delete</Translate>
                            </span>
                          </Button>
                        </div>
                      </td>
                    }
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            !loading && (
              <div className="alert alert-warning">
                <Translate contentKey="crownApp.receiverSupplier.home.notFound">No Receiver Suppliers found</Translate>
              </div>
            )
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authentication, receiverSupplier }: IRootState) => ({
  receiverSupplierList: receiverSupplier.entities,
  loading: receiverSupplier.loading,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
  totalItems: receiverSupplier.totalItems,
  links: receiverSupplier.links,
  entity: receiverSupplier.entity,
  updateSuccess: receiverSupplier.updateSuccess
});

const mapDispatchToProps = {
  getEntities,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReceiverSupplier);
