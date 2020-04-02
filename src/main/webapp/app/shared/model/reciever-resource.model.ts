export interface IRecieverResource {
  id?: string;
  name?: string;
  quantity?: number;
  dailyUse?: number;
  currentStock?: number;
  notes?: string;
}

export const defaultValue: Readonly<IRecieverResource> = {};
