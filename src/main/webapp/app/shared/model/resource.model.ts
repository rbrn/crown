import { ISupplyPointResource } from 'app/shared/model/supply-point-resource.model';

export interface IResource {
  id?: string;
  name?: string;
  notes?: string;
  supplyPointResource?: ISupplyPointResource;
}

export const defaultValue: Readonly<IResource> = {};
