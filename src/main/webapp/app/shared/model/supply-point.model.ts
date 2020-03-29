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

export const defaultValue: Readonly<ISupplyPoint> = {
  isDistributor: false,
  isHealthcare: false,
  hasSterilization: false
};
