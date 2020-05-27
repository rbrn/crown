import React from "react";
import {translate, Translate} from "react-jhipster";
import {AvField, AvGroup, AvInput} from 'availity-reactstrap-validation';
import { Label } from 'reactstrap';

interface ReceiverSupplierFieldsProps {
  fieldPrefix?: string
}
const ReceiverSupplierFields: React.FC<ReceiverSupplierFieldsProps> = ({fieldPrefix}) => {
  return (
    <React.Fragment>
      <AvGroup>
        <Label id="nameLabel" for="receiver-supplier-name">
          <Translate contentKey="crownApp.receiverSupplier.name">Name</Translate>
        </Label>
        <AvField
          id="receiver-supplier-name"
	  helpMessage="*this is required"
          type="text"
          name={`${fieldPrefix || ''}name`}
          validate={{
            required: {value: true, errorMessage: translate('entity.validation.required')}
          }}
        />
      </AvGroup>
      <AvGroup>
        <Label id="addressLabel" for="receiver-supplier-address">
          <Translate contentKey="crownApp.receiverSupplier.address">Address</Translate>
        </Label>
        <AvField
          id="receiver-supplier-address"
	helpMessage="*this is required"
          type="text"
          name={`${fieldPrefix || ''}address`}
          validate={{
            required: {value: true, errorMessage: translate('entity.validation.required')}
          }}
        />
      </AvGroup>
      <AvGroup>
        <Label id="emailLabel" for="receiver-supplier-email">
          <Translate contentKey="crownApp.receiverSupplier.email">Email</Translate>
        </Label>
        <AvField
          id="receiver-supplier-email"
	  helpMessage="*this is required"
          type="text"
          name={`${fieldPrefix || ''}email`}
          validate={{
            required: {value: true, errorMessage: translate('entity.validation.required')}
          }}
        />
      </AvGroup>
      <AvGroup>
        <Label id="primaryContactNameLabel" for="receiver-supplier-primaryContactName">
          <Translate contentKey="crownApp.receiverSupplier.primaryContactName">Primary Contact Name</Translate>
        </Label>
        <AvField
          id="receiver-supplier-primaryContactName"
	helpMessage="*this is required"
		
          type="text"
          name={`${fieldPrefix || ''}primaryContactName`}
          validate={{
            required: {value: true, errorMessage: translate('entity.validation.required')}
          }}
        />
      </AvGroup>
      <AvGroup>
        <Label id="zipLabel" for="receiver-supplier-zip">
          <Translate contentKey="crownApp.receiverSupplier.zip">Zip</Translate>
        </Label>
        <AvField
          id="receiver-supplier-zip"
	   helpMessage="*this is required"
          type="text"
          name={`${fieldPrefix || ''}zip`}
          validate={{
            required: {value: true, errorMessage: translate('entity.validation.required')}
          }}
        />
      </AvGroup>
      <AvGroup>
        <Label id="phonenumberLabel" for="receiver-supplier-phonenumber">
          <Translate contentKey="crownApp.receiverSupplier.phonenumber">Phone number</Translate>
        </Label>
        <AvField
          id="receiver-supplier-phonenumber"
          type="text"
		helpMessage="*this is required"
          name={`${fieldPrefix || ''}phonenumber`}
          validate={{
            required: {value: true, errorMessage: translate('entity.validation.required')}
          }}
        />
      </AvGroup>

      <AvGroup>
        <Label id="cityLabel" for="receiver-supplier-city">
          <Translate contentKey="crownApp.receiverSupplier.city">City</Translate>
        </Label>
        <AvField
          id="receiver-supplier-city"
	   helpMessage="*this is required"
          type="text"
          name={`${fieldPrefix || ''}city`}
          validate={{
            required: {value: true, errorMessage: translate('entity.validation.required')}
          }}
        />
      </AvGroup>
      <AvGroup>
        <Label id="stateLabel" for="receiver-supplier-state">
          <Translate contentKey="crownApp.receiverSupplier.state">State</Translate>
        </Label>
        <AvField
          id="receiver-supplier-state"
	   helpMessage="*this is required"
          type="text"
          name={`${fieldPrefix || ''}state`}
          validate={{
            required: {value: true, errorMessage: translate('entity.validation.required')}
          }}
        />
      </AvGroup>
      <AvGroup>
        <Label id="countryLabel" for="receiver-supplier-country">
          <Translate contentKey="crownApp.receiverSupplier.country">Country</Translate>
        </Label>
        <AvField
          id="receiver-supplier-country"
	   helpMessage="*this is required"
          type="text"
          name={`${fieldPrefix || ''}country`}
          validate={{
            required: {value: true, errorMessage: translate('entity.validation.required')}
          }}
        />
      </AvGroup>

      <AvGroup check>
        <Label id="isReceiverLabel">
          <AvInput id="receiver-supplier-isReceiver" type="checkbox" className="form-check-input" name={`${fieldPrefix || ''}isReceiver`}/>
          <Translate contentKey="crownApp.receiverSupplier.isReceiver">Is Receiver</Translate>
        </Label>
      </AvGroup>
      <AvGroup check>
        <Label id="isSupplierLabel">
          <AvInput id="receiver-supplier-isSupplier" type="checkbox" className="form-check-input" name={`${fieldPrefix || ''}isSupplier`}/>
          <Translate contentKey="crownApp.receiverSupplier.isSupplier">Is Supplier</Translate>
        </Label>
      </AvGroup>
      <AvGroup check>
        <Label id="hasSterilizationLabel">
          <AvInput id="receiver-supplier-hasSterilization" type="checkbox" className="form-check-input"
                   name={`${fieldPrefix || ''}hasSterilization`}/>
          <Translate contentKey="crownApp.receiverSupplier.hasSterilization">Has Sterilization</Translate>
        </Label>
      </AvGroup>
      <AvGroup>
        <Label id="priorityLabel" for="receiver-supplier-priority">
          <Translate contentKey="crownApp.receiverSupplier.priority">Priority</Translate>
        </Label>
        <AvField id="receiver-supplier-priority" type="string" className="form-control" name={`${fieldPrefix || ''}priority`}/>
      </AvGroup>
      <AvGroup>
        <Label id="notesLabel" for="receiver-supplier-notes">
          <Translate contentKey="crownApp.receiverSupplier.notes">Notes</Translate>
        </Label>
        <AvField id="receiver-supplier-notes" type="text" name={`${fieldPrefix || ''}notes`}/>
      </AvGroup>
 
    </React.Fragment>
  )
};

export default ReceiverSupplierFields;

