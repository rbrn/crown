export interface IDelivery {
  id?: string;
  deliveryContact?: string;
  phoneNumber?: string;
  notes?: string;
}

export const defaultValue: Readonly<IDelivery> = {};
