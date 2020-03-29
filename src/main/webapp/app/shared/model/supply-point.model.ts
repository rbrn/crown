export interface ISupplyPoint {
  id?: string;
  name?: string;
  address?: string;
  primaryContactName?: string;
  zip?: string;
  phoneNumber?: string;
  latitude?: number;
  longitude?: number;
  city?: string;
  state?: string;
  email?: string;
  isDistributor?: boolean;
  isHealthcare?: boolean;
  hasSterilization?: boolean;
  priority?: number;
  notes?: string;
}

export const defaultValue: Readonly<ISupplyPoint> = {
  isDistributor: false,
  isHealthcare: false,
  hasSterilization: false
};
