import { ISupplyPointResource } from 'app/shared/model/supply-point-resource.model';

export interface IResource {
  id?: string;
  name?: string;
  notes?: string;
  supplyPointResource?: ISupplyPointResource;
}

export class Resource implements IResource {
  constructor(public id?: string, public name?: string, public notes?: string, public supplyPointResource?: ISupplyPointResource) {}
}
