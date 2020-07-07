import React from "react";
import {translate} from "react-jhipster";
import {Form, Input, Select} from "antd";
import * as i18nIsoCountries from 'i18n-iso-countries';
import i18nEnIsoCountriesJson from 'i18n-iso-countries/langs/en.json';

i18nIsoCountries.registerLocale(i18nEnIsoCountriesJson)
const { Option } = Select;

interface AddressFieldsProps {
  fieldPrefix: string[]
}

const AddressFields: React.FC<AddressFieldsProps> = ({ fieldPrefix }) => {
  const countriesList = i18nIsoCountries.getNames("en");
  return (
    <React.Fragment>
      <Form.Item
        name={[...fieldPrefix, 'country']}
        label={translate('address.country')}
        rules={[
          {
            required: true,
            message: 'Please select country!'
          }
        ]}
        initialValue="US"
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

      <Form.Item
        name={[...fieldPrefix, 'addressLine1']}
        label={translate('address.addressLine1')}
        rules={[
          {
            required: true,
            message: translate('entity.validation.required')
          }
        ]}
      >
        <Input placeholder="Enter Address line 1" />
      </Form.Item>

      <Form.Item
        name={[...fieldPrefix, 'addressLine2']}
        label={translate('address.addressLine2')}
      >
        <Input placeholder="Enter Address line 2" />
      </Form.Item>

      <Form.Item
        name={[...fieldPrefix, 'city']}
        label={translate('address.city')}
        rules={[
          {
            required: true,
            message: translate('entity.validation.required')
          }
        ]}
      >
        <Input placeholder="Enter city" />
      </Form.Item>

      <Form.Item
        name={[...fieldPrefix, 'state']}
        label={translate('address.stateProvinceRegion')}
        rules={[
          {
            required: true,
            message: translate('entity.validation.required')
          }
        ]}
      >
        <Input placeholder="Enter state/province/region" />
      </Form.Item>

      <Form.Item
        name={[...fieldPrefix, 'zip']}
        label={translate('address.postalCode')}
        rules={[
          {
            required: true,
            message: translate('entity.validation.required')
          }
        ]}
      >
        <Input placeholder="Enter zip/postal code" />
      </Form.Item>

    </React.Fragment>
  )
};

export default AddressFields;
