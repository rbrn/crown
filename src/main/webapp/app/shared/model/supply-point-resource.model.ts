import { IResource } from 'app/shared/model/resource.model';
import { ISupplyPoint } from 'app/shared/model/supply-point.model';

export interface ISupplyPointResource {
  id?: string;
  numRequested?: number;
  canProduce?: number;
  numinStock?: number;
  resources?: IResource[];
  supplypoint?: ISupplyPoint;
}

export const defaultValue: Readonly<ISupplyPointResource> = {};
