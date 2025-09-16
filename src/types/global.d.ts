import { Role } from './role';

export interface IUser {
  _id: string;
  email: string;
  role: Role;
}

// Augment the Express Request interface to include our custom user property
declare module 'express' {
  interface Request {
    user: IUser;
  }
}
