import { IResource } from 'app/shared/model/resource.model';
import { IRequestPoint } from 'app/shared/model/request-point.model';

export interface IRequest {
  id?: string;
  itemType?: string;
  numRequested?: number;
  dailyNeed?: number;
  numinStock?: number;
  daysLeft?: number;
  resource?: IResource;
  requestPoint?: IRequestPoint;
}

export const defaultValue: Readonly<IRequest> = {};
