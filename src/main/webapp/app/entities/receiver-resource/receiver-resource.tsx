import React, {useState, useEffect, useRef} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, reset } from './receiver-resource.reducer';
import { IReceiverResource } from 'app/shared/model/receiver-resource.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IReceiverResourceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ReceiverResource = (props: IReceiverResourceProps) => {
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

  const { receiverResourceList, match, loading } = props;
  return (
    <div className="list-container" ref={containerDiv}>
      <h2 id="receiver-resource-heading">
        <Translate contentKey="crownApp.receiverResource.home.title">Receiver Resources</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="crownApp.receiverResource.home.createLabel">Create new Receiver Resource</Translate>
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
          {receiverResourceList && receiverResourceList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  {/* <th className="hand" onClick={sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th> */}
                  <th className="hand" onClick={sort('name')}>
                    <Translate contentKey="crownApp.receiverResource.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('quantity')}>
                    <Translate contentKey="crownApp.receiverResource.quantity">Quantity</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('dailyUse')}>
                    <Translate contentKey="crownApp.receiverResource.dailyUse">Daily Use</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('postedDate')}>
                    <Translate contentKey="crownApp.receiverResource.postedDate">Posted Date</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('currentStock')}>
                    <Translate contentKey="crownApp.receiverResource.currentStock">Current Stock</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('expiration')}>
                    <Translate contentKey="crownApp.receiverResource.expiration">Expiration</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('notes')}>
                    <Translate contentKey="crownApp.receiverResource.notes">Notes</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="crownApp.receiverResource.resourceType">Resource Type</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('productInspection')}>
                    <Translate contentKey="crownApp.receiverResource.productInspection">Product Inspection</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('productInspectDays')}>
                    <Translate contentKey="crownApp.receiverResource.productInspectDays">Product Inspect Days</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('acceptUnpackagedGoods')}>
                    <Translate contentKey="crownApp.receiverResource.acceptUnpackagedGoods">Accept Unpackaged Goods</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('fundRestrictions')}>
                    <Translate contentKey="crownApp.receiverResource.fundRestrictions">Fund Restriction</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('fundsAvailable')}>
                    <Translate contentKey="crownApp.receiverResource.fundsAvailable">Funds Available</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="crownApp.receiverResource.receiver">Receiver</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {receiverResourceList.map((receiverResource, i) => (
                  <tr key={`entity-${i}`}>
                    {/* <td>
                      <Button tag={Link} to={`${match.url}/${receiverResource.id}`} color="link" size="sm">
                        {receiverResource.id}
                      </Button>
                    </td> */}
                    <td>
                      <Button tag={Link} to={`${match.url}/${receiverResource.id}`} color="link" size="sm">
                        {receiverResource.name}
                      </Button>
                    </td>
                    <td>{receiverResource.quantity}</td>
                    <td>{receiverResource.dailyUse}</td>
                    <td>
                      <TextFormat type="date" value={receiverResource.postedDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{receiverResource.currentStock}</td>
                    <td>
                      <TextFormat type="date" value={receiverResource.expiration} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{receiverResource.notes}</td>
                    <td>
                      {receiverResource.resourceType ? (
                        <Link to={`resource-type/${receiverResource.resourceType.id}`}>{receiverResource.resourceType.name}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td>{receiverResource.productInspection}</td>
                    <td>{receiverResource.productInspectDays}</td>
                    <td>{receiverResource.acceptUnpackagedGoods}</td>
                    <td>{receiverResource.fundRestrictions}</td>
                    <td>{receiverResource.fundsAvailable}</td>
                    <td>
                      {receiverResource.receiver ? (
                        <Link to={`receiver-supplier/${receiverResource.receiver.id}`}>{receiverResource.receiver.name}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${receiverResource.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${receiverResource.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${receiverResource.id}/delete`} color="danger" size="sm">
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
                <Translate contentKey="crownApp.receiverResource.home.notFound">No Receiver Resources found</Translate>
              </div>
            )
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

const mapStateToProps = ({ receiverResource }: IRootState) => ({
  receiverResourceList: receiverResource.entities,
  loading: receiverResource.loading,
  totalItems: receiverResource.totalItems,
  links: receiverResource.links,
  entity: receiverResource.entity,
  updateSuccess: receiverResource.updateSuccess
});

const mapDispatchToProps = {
  getEntities,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReceiverResource);
