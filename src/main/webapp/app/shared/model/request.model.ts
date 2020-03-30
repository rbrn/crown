import { IRequestPoint } from 'app/shared/model/request-point.model';

export interface IRequest {
  id?: string;
  itemType?: string;
  numRequested?: number;
  dailyNeed?: number;
  numinStock?: number;
  daysLeft?: number;
  requestPoint?: IRequestPoint;
}

export const defaultValue: Readonly<IRequest> = {};
