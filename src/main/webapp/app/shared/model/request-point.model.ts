import { IRequest } from 'app/shared/model/request.model';

export interface IRequestPoint {
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
  requests?: IRequest[];
}

export const defaultValue: Readonly<IRequestPoint> = {
  isDistributor: false,
  isHealthcare: false,
  hasSterilization: false
};
