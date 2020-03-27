import { IResource } from 'app/shared/model/resource.model';
import { ISupplyPoint } from 'app/shared/model/supply-point.model';

export interface ISupplyPointResource {
  id?: string;
  numRequested?: number;
  canProduce?: number;
  numinStock?: number;
  resources?: IResource[];
  supplyPoint?: ISupplyPoint;
}

export class SupplyPointResource implements ISupplyPointResource {
  constructor(
    public id?: string,
    public numRequested?: number,
    public canProduce?: number,
    public numinStock?: number,
    public resources?: IResource[],
    public supplyPoint?: ISupplyPoint
  ) {}
}
