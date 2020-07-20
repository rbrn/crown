import React from "react";
import {translate, Translate} from "react-jhipster";
import {Checkbox, Form, Input, Select} from "antd";
import AddressFields from "app/entities/receiver-supplier/address-fields";
import UploadFile from "app/commonComponents/UploadFile";
import {normFile} from "app/helpers/utils";
import * as i18nIsoCountries from 'i18n-iso-countries';
import i18nEnIsoCountriesJson from 'i18n-iso-countries/langs/en.json';
import PocAddressFields from "app/entities/receiver-supplier/poc-address-fields";

i18nIsoCountries.registerLocale(i18nEnIsoCountriesJson)

const { Option } = Select;

interface ReceiverSupplierFieldsProps {
  fieldPrefix: string
  updatePoaFileList: (fileName) => void
}

const ReceiverSupplierAntFields: React.FC<ReceiverSupplierFieldsProps> = ({fieldPrefix, updatePoaFileList}) => {
  const countriesList = i18nIsoCountries.getNames("en");

  const addressFields = () => {
    return (
      <React.Fragment>
        <h6 id="crownApp.receiverSupplier.orgAddress">
          <Translate contentKey="crownApp.receiverSupplier.orgAddress">Organization Address</Translate>
        </h6>
        <AddressFields fieldPrefix={[fieldPrefix]}/>
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
        <PocAddressFields fieldPrefix={[fieldPrefix]}/>
      </React.Fragment>
    )
  };

  return (
    <React.Fragment>
      <h5 id="crownApp.receiverSupplier.orgDetails">
        <Translate contentKey="crownApp.receiverSupplier.orgDetails">Organization details</Translate>
      </h5>
      {
        fieldPrefix.includes('receiver') ? null : (
          <Form.Item
            name={[fieldPrefix, 'sellerType']}
            label={translate('crownApp.receiverSupplier.sellerType')}
          >
            <Select placeholder="Select seller type">
              <Option value="">Select</Option>
              <Option value="supplier">Supplier</Option>
              <Option value="manufacturer">Manufacturer</Option>
              <Option value="individual">Individual</Option>
            </Select>
          </Form.Item>
        )
      }
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

      {
        fieldPrefix.includes('receiver') ? null : (
          <Form.Item
            name={[fieldPrefix, 'manufacturerCountry']}
            label={translate('crownApp.receiverSupplier.manufacturerCountry')}
          >
            <Select placeholder="Select country">
              {countriesList
                ? Object.keys(countriesList).map((key, index) => (
                  <Option value={key} key={index}>
                    {countriesList[key]}
                  </Option>
                ))
                : null}
            </Select>
          </Form.Item>
        )
      }

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
        style={{ display: 'none' }}
      >
        <Input hidden={true}/>
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
          {fieldPrefix.includes('receiver') ?
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
        // shouldUpdate={
        //   (prevValues, currentValues) =>
        //     prevValues[fieldPrefix].differentLocationAddress !== currentValues[fieldPrefix].differentLocationAddress
        // }
      >
        {({getFieldValue}) => {
          return getFieldValue([fieldPrefix, 'differentLocationAddress']) ? maybeAdditionalAddressFields() : null;
        }}
      </Form.Item>
      {/* following fields will be removed in upcoming sprints, keeping them here for now as these are required in backend */}
      <Form.Item
        name={[fieldPrefix, 'name']}
        hidden={true}
        style={{ display: 'none' }}
        initialValue="test name"
      >
        <Input hidden={true}/>
      </Form.Item>
      <Form.Item
        name={[fieldPrefix, 'primaryContactName']}
        hidden={true}
        style={{ display: 'none' }}
        initialValue="test primaryContactName"
      >
        <Input hidden={true}/>
      </Form.Item>
    </React.Fragment>
  )
};

export default ReceiverSupplierAntFields;
