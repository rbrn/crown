import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, getSortState, IPaginationBaseState } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities, reset } from './reciever-supplier.reducer';
import { IRecieverSupplier } from 'app/shared/model/reciever-supplier.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IRecieverSupplierProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const RecieverSupplier = (props: IRecieverSupplierProps) => {
  const [search, setSearch] = useState('');
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));
  const [sorting, setSorting] = useState(false);

  const getAllEntities = () => {
    if (search) {
      props.getSearchEntities(
        search,
        paginationState.activePage - 1,
        paginationState.itemsPerPage,
        `${paginationState.sort},${paginationState.order}`
      );
    } else {
      props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
    }
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

  const startSearching = () => {
    if (search) {
      props.reset();
      setPaginationState({
        ...paginationState,
        activePage: 1
      });
      props.getSearchEntities(
        search,
        paginationState.activePage - 1,
        paginationState.itemsPerPage,
        `${paginationState.sort},${paginationState.order}`
      );
    }
  };

  const clear = () => {
    props.reset();
    setSearch('');
    setPaginationState({
      ...paginationState,
      activePage: 1
    });
    props.getEntities();
  };

  const handleSearch = event => setSearch(event.target.value);

  useEffect(() => {
    getAllEntities();
  }, [paginationState.activePage]);

  const handleLoadMore = () => {
    if (window.pageYOffset > 0) {
      setPaginationState({
        ...paginationState,
        activePage: paginationState.activePage + 1
      });
    }
  };

  useEffect(() => {
    if (sorting) {
      getAllEntities();
      setSorting(false);
    }
  }, [sorting, search]);

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

  const { recieverSupplierList, match, loading } = props;
  return (
    <div>
      <h2 id="reciever-supplier-heading">
        <Translate contentKey="crownApp.recieverSupplier.home.title">Reciever Suppliers</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="crownApp.recieverSupplier.home.createLabel">Create new Reciever Supplier</Translate>
        </Link>
      </h2>
      <Row>
        <Col sm="12">
          <AvForm onSubmit={startSearching}>
            <AvGroup>
              <InputGroup>
                <AvInput
                  type="text"
                  name="search"
                  value={search}
                  onChange={handleSearch}
                  placeholder={translate('crownApp.recieverSupplier.home.search')}
                />
                <Button className="input-group-addon">
                  <FontAwesomeIcon icon="search" />
                </Button>
                <Button type="reset" className="input-group-addon" onClick={clear}>
                  <FontAwesomeIcon icon="trash" />
                </Button>
              </InputGroup>
            </AvGroup>
          </AvForm>
        </Col>
      </Row>
      <div className="table-responsive">
        <InfiniteScroll
          pageStart={paginationState.activePage}
          loadMore={handleLoadMore}
          hasMore={paginationState.activePage - 1 < props.links.next}
          loader={<div className="loader">Loading ...</div>}
          threshold={0}
          initialLoad={false}
        >
          {recieverSupplierList && recieverSupplierList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('name')}>
                    <Translate contentKey="crownApp.recieverSupplier.name">Name</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('address')}>
                    <Translate contentKey="crownApp.recieverSupplier.address">Address</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('email')}>
                    <Translate contentKey="crownApp.recieverSupplier.email">Email</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('primaryContactName')}>
                    <Translate contentKey="crownApp.recieverSupplier.primaryContactName">Primary Contact Name</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('zip')}>
                    <Translate contentKey="crownApp.recieverSupplier.zip">Zip</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('phonenumber')}>
                    <Translate contentKey="crownApp.recieverSupplier.phonenumber">Phonenumber</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('latx')}>
                    <Translate contentKey="crownApp.recieverSupplier.latx">Latx</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('longy')}>
                    <Translate contentKey="crownApp.recieverSupplier.longy">Longy</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('city')}>
                    <Translate contentKey="crownApp.recieverSupplier.city">City</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('state')}>
                    <Translate contentKey="crownApp.recieverSupplier.state">State</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('country')}>
                    <Translate contentKey="crownApp.recieverSupplier.country">Country</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('npi')}>
                    <Translate contentKey="crownApp.recieverSupplier.npi">Npi</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('isReceiver')}>
                    <Translate contentKey="crownApp.recieverSupplier.isReceiver">Is Receiver</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('isSupplier')}>
                    <Translate contentKey="crownApp.recieverSupplier.isSupplier">Is Supplier</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('hasSterilization')}>
                    <Translate contentKey="crownApp.recieverSupplier.hasSterilization">Has Sterilization</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('priority')}>
                    <Translate contentKey="crownApp.recieverSupplier.priority">Priority</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={sort('notes')}>
                    <Translate contentKey="crownApp.recieverSupplier.notes">Notes</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {recieverSupplierList.map((recieverSupplier, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${recieverSupplier.id}`} color="link" size="sm">
                        {recieverSupplier.id}
                      </Button>
                    </td>
                    <td>{recieverSupplier.name}</td>
                    <td>{recieverSupplier.address}</td>
                    <td>{recieverSupplier.email}</td>
                    <td>{recieverSupplier.primaryContactName}</td>
                    <td>{recieverSupplier.zip}</td>
                    <td>{recieverSupplier.phonenumber}</td>
                    <td>{recieverSupplier.latx}</td>
                    <td>{recieverSupplier.longy}</td>
                    <td>{recieverSupplier.city}</td>
                    <td>{recieverSupplier.state}</td>
                    <td>{recieverSupplier.country}</td>
                    <td>{recieverSupplier.npi}</td>
                    <td>{recieverSupplier.isReceiver ? 'true' : 'false'}</td>
                    <td>{recieverSupplier.isSupplier ? 'true' : 'false'}</td>
                    <td>{recieverSupplier.hasSterilization ? 'true' : 'false'}</td>
                    <td>{recieverSupplier.priority}</td>
                    <td>{recieverSupplier.notes}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${recieverSupplier.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${recieverSupplier.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${recieverSupplier.id}/delete`} color="danger" size="sm">
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
                <Translate contentKey="crownApp.recieverSupplier.home.notFound">No Reciever Suppliers found</Translate>
              </div>
            )
          )}
        </InfiniteScroll>
      </div>
    </div>
  );
};

const mapStateToProps = ({ recieverSupplier }: IRootState) => ({
  recieverSupplierList: recieverSupplier.entities,
  loading: recieverSupplier.loading,
  totalItems: recieverSupplier.totalItems,
  links: recieverSupplier.links,
  entity: recieverSupplier.entity,
  updateSuccess: recieverSupplier.updateSuccess
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RecieverSupplier);
