import { IReceiverResource } from 'app/shared/model/receiver-resource.model';
import { ISupplierResource } from 'app/shared/model/supplier-resource.model';
import { ClaimStatusEnum } from 'app/shared/model/enumerations/claim-status-enum.model';
import { Moment } from 'moment';

export interface IClaim {
  id?: string;
  quantity?: number;
  notes?: string;
  status?: ClaimStatusEnum;
  currentStock?: number;
  expiration?: Moment;
  proofOfFunds?: string;
  productInspection?: boolean;
  productInspectDays?: number;
  fundsAvailable?: boolean;
  acceptUnpackagedGoods?: boolean;
  fundRestrictions?: string;
  receiverResource?: IReceiverResource;
  supplierResource?: ISupplierResource;
}

export const defaultValue: Readonly<IClaim> = {
  status: ClaimStatusEnum.PENDING
};
