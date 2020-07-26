import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router-dom';
import {Button, Checkbox, Col, DatePicker, Form, Input, InputNumber, Row, Select, Switch} from 'antd';
import {Translate, translate} from 'react-jhipster';
import {IRootState} from 'app/shared/reducers';
import {getEntities as getReceiverResources} from 'app/entities/receiver-resource/receiver-resource.reducer';
import {getEntities as getReceiverSuppliers} from 'app/entities/receiver-supplier/receiver-supplier.reducer';
import {
  getEntities as getSupplierResources,
  getEntity as getSupplierResourceEntity
} from 'app/entities/supplier-resource/supplier-resource.reducer';
import {createEntity, getEntity, updateEntity} from './claim.reducer';
import {defaultValue, IClaim} from "app/shared/model/claim.model";
import ReceiverSupplierAntFields from "app/entities/receiver-supplier/receiver-supplier-fields-ant";
import {normFile} from "app/helpers/utils";
import UploadFile from "app/commonComponents/UploadFile";
import {getEntities as getResourceTypes} from "app/entities/resource-type/resource-type.reducer";
import {ArrowLeftOutlined} from '@ant-design/icons';
import App from "app/entities/receiver-resource/ant-loading-button";

const { Option } = Select;

export interface IClaimRequestProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {
}
export interface IReceiverResourceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}
export const ClaimRequest = (props: IClaimRequestProps) => {
  const [receiverResourceId, setReceiverResourceId] = useState('0');
  const [supplierResourceId, setSupplierResourceId] = useState('0');
  const [ApproximatePriceValue] = useState('0');
  const [entity, setEntity] = useState(defaultValue);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);
  const { claimEntity, receiverResources, receiverSuppliers, supplierResources, loading, updating, account, resourceTypes } = props;
  const [isAssistedCreation, setIsAssistedCreation] = useState(false);
  const [pofFileList, setPofFileList] = useState('');
  const [poaFileList, setPoaFileList] = useState('');
  const [form] = Form.useForm();

  const query = new URLSearchParams(props.location.search);
  const lat = query.get('lat') || 0;
  const lng = query.get('lng') || 0;
  const initialValues: IClaim = {
    receiverResource: {
      receiver: {
        email: account.email,
        isReceiver: true,
        latx: Number(lat),
        longy: Number(lng)
      }
    }
  }

  const receiverProfile = receiverSuppliers.filter(receiver => receiver.email === account.email);
  const handleClose = () => {
    props.history.push('/claim');
  };

  const updatePofFileList = fileName => {
    if (!pofFileList.includes(fileName)) {
      setPofFileList(`${pofFileList.length > 0 ? `${pofFileList},` : ''}${fileName}`);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      proofOfFunds: pofFileList
    });
  }, [pofFileList]);

  const updatePoaFileList = fileName => {
    if (!poaFileList.includes(fileName)) {
      setPoaFileList(`${poaFileList.length > 0 ? `${poaFileList},` : ''}${fileName}`);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      receiver: {
        proofOfAssociation: poaFileList
      }
    });
  }, [poaFileList]);

  useEffect(() => {
    const localSupplierId = new URLSearchParams(props.location.search).get("supplierResourceId");

    if (localSupplierId) {
      setSupplierResourceId(localSupplierId)
      setIsAssistedCreation(true)
    }

    // props.getReceiverResources();
    props.getSupplierResourceEntity(localSupplierId);
  }, []);

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getResourceTypes();
    props.getReceiverSuppliers();
  }, []);

  useEffect(() => {
    form.setFieldsValue({...props.claimEntity})
  }, [props.claimEntity]);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  useEffect(() => {
    setEntity({ ...entity, supplierResource: props.supplierResourceEntity })
    form.setFieldsValue({
      receiverResource: {
        resourceType: props.supplierResourceEntity.resourceType
      },
      supplierResource: props.supplierResourceEntity
    })
  }, [props.supplierResourceEntity]);

  const saveEntity = values => {
    const persistent: IClaim = {
      ...entity,
      ...values
    };
    if (receiverProfile.length !== 0) {
      persistent.receiverResource.receiver = {
        email: receiverProfile[0].email
      }
    } else {
      const receiver = {
        ...persistent.receiverResource.receiver,
        email: account.email,
        isReceiver: true,
        latx: Number(lat),
        longy: Number(lng)
      }
      persistent.receiverResource.receiver = receiver
    }
    props.createEntity(persistent);
  };

  const mayBeReceiverFields = () => {
    if (receiverProfile && receiverProfile.length > 0) {
      return null;
    }
    return (
      <React.Fragment>
        <ReceiverSupplierAntFields
          fieldPrefix={['receiverResource', 'receiver']}
          updatePoaFileList={updatePoaFileList}
        />
      </React.Fragment>
    );
  };

  // if (receiverResourceEntity.postedDate) {
  //   initialValues.postedDate = moment(receiverResourceEntity.postedDate);
  // }
  // if (receiverResourceEntity.expiration) {
  //   initialValues.expiration = moment(receiverResourceEntity.expiration);
  // }
  return (

    <div>
      <Row className="justify-content-center">
        <Col span={16}>
          <h2 id="crownApp.claim.home.createOrEditLabel">
            <Translate contentKey="crownApp.claim.home.createOrEditLabel">Create or edit a Claim</Translate>
          </h2>
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col span={16}>
          {loading ? (
            <p>Loading...</p>
          ) : (
              <div>
                {entity.supplierResource && entity.supplierResource.id ? (
                  <div style={{ paddingBottom: "20px" }}>
                    <div>Available Quantity: {entity.supplierResource?.quantity}</div>
                    <div>Cost per unit: {entity.supplierResource?.cost}</div>
                  </div>
                ) :
                  null}
                <Form
                  name="claim"
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
                      <Input />
                    </Form.Item>
                  ) : null}
                  <Form.Item
                    name={['receiverResource', 'resourceType', 'id']}
                    label={translate('crownApp.receiverResource.resourceType')}
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
                    name={['receiverResource', 'quantity']}
                    label={translate('crownApp.receiverResource.quantity')}
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
                    name={['receiverResource', 'dailyUse']}
                    label={translate('crownApp.receiverResource.dailyUse')}
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
                    name={['receiverResource', 'postedDate']}
                    label={translate('crownApp.receiverResource.postedDate')}
                    rules={[
                      {
                        required: true,
                        message: translate('entity.validation.required')
                      }
                    ]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item name={['receiverResource', 'expiration']} label={translate('crownApp.receiverResource.expiration')}>
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item name={['receiverResource', 'currentStock']} label={translate('crownApp.receiverResource.currentStock')}>
                    <InputNumber style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item name={['receiverResource', 'notes']} label={translate('crownApp.receiverResource.notes')}>
                    <Input />
                  </Form.Item>

                  <Form.Item name={['receiverResource', 'productInspection']} label={translate('crownApp.receiverResource.productInspection')} valuePropName="checked">
                    <Switch />
                  </Form.Item>

                  <Form.Item name={['receiverResource', 'productInspectDays']} label={translate('crownApp.receiverResource.productInspectDays')}>
                    <InputNumber style={{ width: '100%' }} />
                  </Form.Item>

                  <Form.Item name={['receiverResource', 'acceptUnpackagedGoods']} valuePropName="checked">
                    <Checkbox>
                      <Translate contentKey="crownApp.receiverResource.acceptUnpackagedGoods">
                        Are you willing to accept unpackaged goods?
                      </Translate>
                    </Checkbox>
                  </Form.Item>

                  <Form.Item name={['receiverResource', 'fundRestrictions']} label={translate('crownApp.receiverResource.fundRestrictions')}>
                    <Input />
                  </Form.Item>

                  <Form.Item name={['receiverResource', 'fundsAvailable']} label={translate('crownApp.receiverResource.fundsAvailable')} valuePropName="checked">
                    <Switch />
                  </Form.Item>

                  <Form.Item
                    name={['receiverResource', 'pofFiles']}
                    label={translate('crownApp.receiverResource.pof')}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                  >
                    <UploadFile
                      action="api/document/upload"
                      onSuccess={updatePofFileList}
                      data={{
                        entityType: 'buy',
                        fieldType: 'pof'
                      }}
                    />
                  </Form.Item>
                  <Form.Item name={['receiverResource', 'isBuyer']} style={{ display: 'none' }}>
                    <Input hidden={true} />
                  </Form.Item>
                  {mayBeReceiverFields()}
                  <Row gutter={[0, 8]}>
                    <Col span={4}>
                      <Form.Item>
                        <Button type="default" icon={<ArrowLeftOutlined />}>
                          {translate('entity.action.back')}
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
              </div>
            )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  receiverResources: storeState.receiverResource.entities,
  receiverSuppliers: storeState.receiverSupplier.entities,
  supplierResources: storeState.supplierResource.entities,
  supplierResourceEntity: storeState.supplierResource.entity,
  claimEntity: storeState.claim.entity,
  loading: storeState.claim.loading,
  updating: storeState.claim.updating,
  updateSuccess: storeState.claim.updateSuccess,
  account: storeState.authentication.account,
  resourceTypes: storeState.resourceType.entities
});

const mapDispatchToProps = {
  getReceiverResources,
  getSupplierResources,
  getEntity,
  updateEntity,
  createEntity,
  getSupplierResourceEntity,
  getResourceTypes,
  getReceiverSuppliers
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ClaimRequest);
