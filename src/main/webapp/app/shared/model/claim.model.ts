import { IReceiverResource } from 'app/shared/model/receiver-resource.model';
import { ISupplierResource } from 'app/shared/model/supplier-resource.model';

export interface IClaim {
  id?: string;
  quantity?: number;
  notes?: string;
  receiverResource?: IReceiverResource;
  supplierResource?: ISupplierResource;
}

export const defaultValue: Readonly<IClaim> = {};
