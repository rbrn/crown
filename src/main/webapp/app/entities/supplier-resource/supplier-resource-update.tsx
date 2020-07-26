import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Translate, translate} from 'react-jhipster';
import {IRootState} from 'app/shared/reducers';
import {getEntities as getResourceTypes} from 'app/entities/resource-type/resource-type.reducer';
import {getEntities as getReceiverSuppliers} from 'app/entities/receiver-supplier/receiver-supplier.reducer';
import {createEntity, getEntity, reset, updateEntity} from './supplier-resource.reducer';

import {Button, Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, Select} from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';
import moment from "moment";
import ReceiverSupplierAntFields from "app/entities/receiver-supplier/receiver-supplier-fields-ant";
import App from 'app/entities/receiver-resource/ant-loading-button'
import UploadFile from 'app/commonComponents/UploadFile';
import {normFile} from "app/helpers/utils";
import {ISupplierResource} from "app/shared/model/supplier-resource.model";

const { Option } = Select;

export interface ISupplierResourceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const SupplierResourceUpdate = (props: ISupplierResourceUpdateProps) => {
  const [resourceTypeId, setResourceTypeId] = useState('0');
  const [supplierId, setSupplierId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const [poaFileList, setPoaFileList] = useState('');
  const [form] = Form.useForm();

  const { supplierResourceEntity, resourceTypes, receiverSuppliers, loading, updating, account } = props;
  const supplierProfile = receiverSuppliers.filter(supplier => supplier.email === account.email);

  let lat;
  let lng;

  const handleClose = () => {
    props.history.push('/supplier-resource');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }
    props.getResourceTypes();
    props.getReceiverSuppliers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const updatePoaFileList = fileName => {
    if (!poaFileList.includes(fileName)) {
      setPoaFileList(`${poaFileList.length > 0 ? `${poaFileList},` : ''}${fileName}`);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      supplier: {
        proofOfAssociation: poaFileList
      }
    });
  }, [poaFileList]);

  const mayBeSupplierFields = () => {
    if (supplierProfile && supplierProfile.length > 0) {
      return null;
    }
    return (
      <React.Fragment>
        <ReceiverSupplierAntFields
          fieldPrefix={['supplier']}
          updatePoaFileList={updatePoaFileList}
        />
      </React.Fragment>
    );
  };

  const saveEntity = values => {
    const entity = {
      ...(!isNew && {...supplierResourceEntity}),
      ...values
    };

    if (isNew) {
      const query = new URLSearchParams(props.location.search);
      lat = query.get('lat');
      lng = query.get('lng');
      entity.position = [lat, lng];

      if (supplierProfile.length === 0 && entity.supplier) {
        if (!entity.supplier.latx) {
          entity.supplier.latx = lat;
        }
        if (!entity.supplier.longy) {
          entity.supplier.longy = lng;
        }
      } else {
        entity.supplier = {
          email: supplierProfile[0].email
        };
      }
      props.createEntity(entity);
    } else {
      props.updateEntity(entity);
    }
  };

  const initialValues: ISupplierResource = {
    ...(!isNew && {...supplierResourceEntity}),
    supplier: {
      email: account.email,
      isSupplier: true
    }
  }
  if (supplierResourceEntity.quantityValidUntil) {
    initialValues.quantityValidUntil = moment(supplierResourceEntity.quantityValidUntil);
  }

  return (
    <div>
      <Row className="justify-content-center">
        <Col span={16}>
          <h2 id="crownApp.supplierResource.home.createLabel">
            <Translate contentKey="crownApp.supplierResource.home.createLabel">Sell a Resource</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col span={16}>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Form
              name="supplierResource"
              onFinish={saveEntity}
              layout="vertical"
              initialValues={initialValues}
              form={form}
            >
              {!isNew ? (
                <Form.Item
                  name="id"
                  label={translate('global.field.id')}
                  rules={[
                    {
                      required: true,
                      message: ''
                    }
                  ]}
                >
                  <Input disabled />
                </Form.Item>
              ) : null}

              <Form.Item
                name={['resourceType', "id"]}
                label={translate('crownApp.supplierResource.resourceType')}
                rules={[
                  {
                    required: true,
                    message: 'Please select a resource type!'
                  }
                ]}
              >
                <Select placeholder="Select a resource type">
                  <Option value="" key="0">
                    Select
                  </Option>
                  {resourceTypes
                    ? resourceTypes.map(otherEntity => (
                        <Option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.name}
                        </Option>
                      ))
                    : null}
                </Select>
              </Form.Item>

              <Form.Item
                name="quantity"
                label={translate('crownApp.supplierResource.quantity')}
                rules={[
                  {
                    required: true,
                    message: translate('entity.validation.required')
                  }
                ]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="quantityValidUntil"
                label={translate('crownApp.supplierResource.quantityValidUntil')}
                rules={[
                  {
                    required: true,
                    message: translate('entity.validation.required')
                  }
                ]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="cost"
                label={translate('crownApp.supplierResource.cost')}
                rules={[
                  {
                    required: true,
                    message: translate('entity.validation.required')
                  }
                ]}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="productAvailabilityLeadTime"
                label={translate('crownApp.supplierResource.productAvailabilityLeadTime')}
                rules={[
                  {
                    required: true,
                    message: translate('entity.validation.required')
                  }
                ]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="minOrderQuantity"
                label={translate('crownApp.supplierResource.minOrderQuantity')}
                rules={[
                  {
                    required: true,
                    message: translate('entity.validation.required')
                  }
                ]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                name="quantityOnHand"
                label={translate('crownApp.supplierResource.quantityOnHand')}
                rules={[
                  {
                    required: true,
                    message: translate('entity.validation.required')
                  }
                ]}
              >
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                name="SupportingDocuments"
                label={translate('crownApp.supplierResource.supportingDocuments')}
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                  <UploadFile
                    action="api/document/upload"
                    onSuccess={updatePoaFileList}
                    data={{
                      entityType: 'sell',
                      fieldType: 'poa'
                    }}
                  />
              </Form.Item>
                <Form.Item
                  name="productAssets"
                  label={translate('crownApp.supplierResource.productAssets')}
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <UploadFile
                    action="api/document/upload"
                    onSuccess={updatePoaFileList}
                    data={{
                      entityType: 'sell',
                      fieldType: 'poa'
                    }}
                  />
                </Form.Item>
                <Form.Item
                  name="ProofOfLife"
                  label={translate('crownApp.supplierResource.proofOfLife')}
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <UploadFile
                    action="api/document/upload"
                    onSuccess={updatePoaFileList}
                    data={{
                      entityType: 'sell',
                      fieldType: 'poa'
                    }}
                  />
                </Form.Item>
                <Form.Item name="publicationPermission"
                  valuePropName="checked"
                  rules={[
                    { validator: (_, value) => value ? Promise.resolve() : Promise.reject('Please Accept the Terms and Policy') },
                  ]}
                >
                  <Checkbox>
                    I give permission for publication of my product and have read the <Link to='/policy'>Terms and Policy</Link>
                  </Checkbox>
                </Form.Item>
              <Form.Item name="isSupplier" style={{ display: 'none' }}>
                <Input hidden={true} />
              </Form.Item>
              {mayBeSupplierFields()}
              <Row gutter={[0, 8]}>
                <Col span={4}>
                    <Form.Item>
                      <Button type="default" href="/supplier-resource" icon={<ArrowLeftOutlined />}>
                      {translate('entity.action.cancel')}
                    </Button>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item>
                      <App />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  resourceTypes: storeState.resourceType.entities,
  receiverSuppliers: storeState.receiverSupplier.entities,
  supplierResourceEntity: storeState.supplierResource.entity,
  loading: storeState.supplierResource.loading,
  updating: storeState.supplierResource.updating,
  updateSuccess: storeState.supplierResource.updateSuccess,
  account: storeState.authentication.account
});

const mapDispatchToProps = {
  getResourceTypes,
  getReceiverSuppliers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(SupplierResourceUpdate);
