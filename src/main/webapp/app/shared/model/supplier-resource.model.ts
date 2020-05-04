import { IResourceType } from 'app/shared/model/resource-type.model';
import { IReceiverSupplier } from 'app/shared/model/receiver-supplier.model';

export interface ISupplierResource {
  id?: string;
  quantity?: number;
  cost?: number;
  resourceType?: IResourceType;
  supplier?: IReceiverSupplier;
}

export const defaultValue: Readonly<ISupplierResource> = {};
