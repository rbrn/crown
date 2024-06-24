import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getSearchEntities, getEntities } from './request-point.reducer';
import { IRequestPoint } from 'app/shared/model/request-point.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRequestPointProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const RequestPoint = (props: IRequestPointProps) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    props.getEntities();
  }, []);

  const startSearching = () => {
    if (search) {
      props.getSearchEntities(search);
    }
  };

  const clear = () => {
    setSearch('');
    props.getEntities();
  };

  const handleSearch = event => setSearch(event.target.value);

  const { requestPointList, match, loading } = props;
  return (
    <div>
      <h2 id="request-point-heading">
        <Translate contentKey="crownApp.requestPoint.home.title">Request Points</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="crownApp.requestPoint.home.createLabel">Create new Request Point</Translate>
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
                  placeholder={translate('crownApp.requestPoint.home.search')}
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
        {requestPointList && requestPointList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.requestPoint.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.requestPoint.address">Address</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.requestPoint.primaryContactName">Primary Contact Name</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.requestPoint.zip">Zip</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.requestPoint.phonenumber">Phonenumber</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.requestPoint.latx">Latx</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.requestPoint.longy">Longy</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.requestPoint.city">City</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.requestPoint.state">State</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.requestPoint.isDistributor">Is Distributor</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.requestPoint.isHealthcare">Is Healthcare</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.requestPoint.hasSterilization">Has Sterilization</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.requestPoint.priority">Priority</Translate>
                </th>
                <th>
                  <Translate contentKey="crownApp.requestPoint.notes">Notes</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {requestPointList.map((requestPoint, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${requestPoint.id}`} color="link" size="sm">
                      {requestPoint.id}
                    </Button>
                  </td>
                  <td>{requestPoint.name}</td>
                  <td>{requestPoint.address}</td>
                  <td>{requestPoint.primaryContactName}</td>
                  <td>{requestPoint.zip}</td>
                  <td>{requestPoint.phonenumber}</td>
                  <td>{requestPoint.latx}</td>
                  <td>{requestPoint.longy}</td>
                  <td>{requestPoint.city}</td>
                  <td>{requestPoint.state}</td>
                  <td>{requestPoint.isDistributor ? 'true' : 'false'}</td>
                  <td>{requestPoint.isHealthcare ? 'true' : 'false'}</td>
                  <td>{requestPoint.hasSterilization ? 'true' : 'false'}</td>
                  <td>{requestPoint.priority}</td>
                  <td>{requestPoint.notes}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${requestPoint.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${requestPoint.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${requestPoint.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="crownApp.requestPoint.home.notFound">No Request Points found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ requestPoint }: IRootState) => ({
  requestPointList: requestPoint.entities,
  loading: requestPoint.loading
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(RequestPoint);
