import React from "react";
import {translate, Translate} from "react-jhipster";
import {Checkbox, Form, Input} from "antd";
import AddressFields from "app/entities/receiver-supplier/address-fields";
import UploadFile from "app/commonComponents/UploadFile";
import {normFile} from "app/helpers/utils";

interface ReceiverSupplierFieldsProps {
  fieldPrefix: string
  updatePoaFileList: (fileName) => void
}

const ReceiverSupplierAntFields: React.FC<ReceiverSupplierFieldsProps> = ({fieldPrefix, updatePoaFileList}) => {
  const addressFields = () => {
    return (
      <React.Fragment>
        <h6 id="crownApp.receiverSupplier.orgAddress">
          <Translate contentKey="crownApp.receiverSupplier.orgAddress">Organization Address</Translate>
        </h6>
        <AddressFields fieldPrefix={[fieldPrefix, 'orgAddress']}/>
      </React.Fragment>
    )
  };

  const maybeAdditionalAddressFields = () => {
    const addressKey = fieldPrefix.includes('receiver') ?
      'crownApp.receiverSupplier.deliveryAddress' :
      'crownApp.receiverSupplier.sellerAddress'
    return (
      <React.Fragment>
        <h6 id={addressKey}>
          <Translate contentKey={addressKey}>Delivery Address</Translate>
        </h6>
        <AddressFields fieldPrefix={[fieldPrefix, 'location']}/>
      </React.Fragment>
    )
  };

  const differentLocationAddress = `${fieldPrefix || ''}differentLocationAddress`;

  return (
    <React.Fragment>
      <h5 id="crownApp.receiverSupplier.orgDetails">
        <Translate contentKey="crownApp.receiverSupplier.orgDetails">Organization details</Translate>
      </h5>
      <Form.Item
        name={[fieldPrefix, 'orgName']}
        label={translate('crownApp.receiverSupplier.orgName')}
        rules={[
          {
            required: true,
            message: translate('entity.validation.required')
          }
        ]}
      >
        <Input placeholder="Enter organization name"/>
      </Form.Item>
      <Form.Item
        name={[fieldPrefix, 'orgWebsite']}
        label={translate('crownApp.receiverSupplier.orgWebsite')}
        rules={[
          {
            required: true,
            message: translate('entity.validation.required')
          },
          {
            type: "url",
            message: "This field must be a valid url."
          }
        ]}
      >
        <Input placeholder="Enter organization website"/>
      </Form.Item>

      {addressFields()}

      <h5 id="crownApp.receiverSupplier.contactDetails">
        <Translate contentKey="crownApp.receiverSupplier.contactDetails">Organization details</Translate>
      </h5>

      <Form.Item
        name={[fieldPrefix, 'position']}
        label={translate('crownApp.receiverSupplier.position')}
        rules={[
          {
            required: true,
            message: translate('entity.validation.required')
          }
        ]}
      >
        <Input placeholder="Enter Role/ Title/ Position of person of contact"/>
      </Form.Item>

      <Form.Item
        name={[fieldPrefix, 'pofFiles']}
        label={translate('crownApp.receiverSupplier.proofOfAssociation')}
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <UploadFile
          action="api/document/upload"
          onSuccess={updatePoaFileList}
          data={{
            entityType: 'buyer-seller',
            fieldType: 'poa'
          }}
        />
      </Form.Item>

      <Form.Item
        name={[fieldPrefix, 'proofOfAssociation']}
        hidden={true}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name={[fieldPrefix, 'proofOfAssociationLink']}
        label={translate('crownApp.receiverSupplier.proofOfAssociationLink')}
        rules={[
          {
            required: true,
            message: translate('entity.validation.required')
          },
          {
            type: "url",
            message: "This field must be a valid url."
          }
        ]}
      >
        <Input placeholder="Enter link to organization’s directory or social media link"/>
      </Form.Item>

      <Form.Item
        name={[fieldPrefix, 'firstName']}
        label={translate('crownApp.receiverSupplier.firstName')}
        rules={[
          {
            required: true,
            message: translate('entity.validation.required')
          }
        ]}
      >
        <Input placeholder="Enter first name of person of contact"/>
      </Form.Item>

      <Form.Item
        name={[fieldPrefix, 'lastName']}
        label={translate('crownApp.receiverSupplier.lastName')}
        rules={[
          {
            required: true,
            message: translate('entity.validation.required')
          }
        ]}
      >
        <Input placeholder="Enter last name of person of contact"/>
      </Form.Item>

      <Form.Item
        name={[fieldPrefix, 'email']}
        label={translate('crownApp.receiverSupplier.email')}
        rules={[{type: 'email'}]}
      >
        <Input disabled/>
      </Form.Item>

      <Form.Item
        name={[fieldPrefix, 'phonenumber']}
        label={translate('crownApp.receiverSupplier.phonenumber')}
        rules={[
          {
            required: true,
            message: translate('entity.validation.required')
          }
        ]}
      >
        <Input placeholder="Enter phone number of person of contact"/>
      </Form.Item>

      <Form.Item
        name={[fieldPrefix, 'secondaryPhoneNumber']}
        label={translate('crownApp.receiverSupplier.secondaryPhoneNumber')}
      >
        <Input placeholder="Enter secondary phone number of person of contact"/>
      </Form.Item>

      <Form.Item
        name={[fieldPrefix, 'differentLocationAddress']}
        valuePropName="checked"
      >
        <Checkbox>
          { fieldPrefix.includes('receiver') ?
            <Translate contentKey="crownApp.receiverSupplier.differentDeliveryAddress">
              Delivery address is the same as organization address?
            </Translate> :
            <Translate contentKey="crownApp.receiverSupplier.differentSellerAddress">
              Location of seller is the same as organization address?
            </Translate>
          }
        </Checkbox>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={
          (prevValues, currentValues) =>
            prevValues[fieldPrefix].differentLocationAddress !== currentValues[fieldPrefix].differentLocationAddress
        }
      >
        {({getFieldValue}) => {
          return getFieldValue([fieldPrefix, 'differentLocationAddress']) ? maybeAdditionalAddressFields() : null;
        }}
      </Form.Item>
      {}
    </React.Fragment>
  )
};

export default ReceiverSupplierAntFields;
