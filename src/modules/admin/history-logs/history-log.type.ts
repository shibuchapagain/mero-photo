import { Role } from '../../../types/role';

export interface IUserSnapShot {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

export enum HistoryLogTypeEnum {
  CATEGORY = 'category',
  VEHICLE = 'vehicle',
  VEHICLE_PLAN = 'vehicle-plan',
  BOOKING = 'booking',
}

export enum HistoryLogMethodEnum {
  CREATED = 'created',
  UPDATED = 'updated',
  DELETED = 'deleted',
}
