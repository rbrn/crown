import { ISupplyPointResource } from 'app/shared/model/supply-point-resource.model';

export interface ISupplyPoint {
  id?: string;
  name?: string;
  address?: string;
  primaryContactName?: string;
  zip?: string;
  phonenumber?: string;
  latx?: number;
  longy?: number;
  city?: string;
  state?: string;
  isDistributor?: boolean;
  isHealthcare?: boolean;
  hasSterilization?: boolean;
  priority?: number;
  notes?: string;
  resourceLocations?: ISupplyPointResource[];
}

export class SupplyPoint implements ISupplyPoint {
  constructor(
    public id?: string,
    public name?: string,
    public address?: string,
    public primaryContactName?: string,
    public zip?: string,
    public phonenumber?: string,
    public latx?: number,
    public longy?: number,
    public city?: string,
    public state?: string,
    public isDistributor?: boolean,
    public isHealthcare?: boolean,
    public hasSterilization?: boolean,
    public priority?: number,
    public notes?: string,
    public resourceLocations?: ISupplyPointResource[]
  ) {
    this.isDistributor = this.isDistributor || false;
    this.isHealthcare = this.isHealthcare || false;
    this.hasSterilization = this.hasSterilization || false;
  }
}
