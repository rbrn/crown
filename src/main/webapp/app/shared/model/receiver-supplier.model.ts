import { IReceiverResource } from 'app/shared/model/receiver-resource.model';
import { ISupplierResource } from 'app/shared/model/supplier-resource.model';

export interface IReceiverSupplier {
  id?: string;
  name?: string;
  address?: string;
  email?: string;
  primaryContactName?: string;
  zip?: string;
  phonenumber?: string;
  latx?: number;
  longy?: number;
  city?: string;
  state?: string;
  country?: string;
  npi?: number;
  isReceiver?: boolean;
  isSupplier?: boolean;
  hasSterilization?: boolean;
  priority?: number;
  notes?: string;
  tags?: string;
  receiverResources?: IReceiverResource[];
  supplierResources?: ISupplierResource[];
}

export const defaultValue: Readonly<IReceiverSupplier> = {
  isReceiver: false,
  isSupplier: false,
  hasSterilization: false
};
