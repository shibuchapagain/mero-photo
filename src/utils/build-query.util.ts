import { FilterQuery } from 'mongoose';
import { IUser } from '../types/global';
import { Role } from '../types/role';

/**
 * Build a Mongoose filter that automatically limits access
 * for non-SUPER_ADMIN users.
 *
 * @param user    Current authenticated user
 * @param base    Additional filters (optional)
 */
export function buildUserQuery<T>(user: IUser, base: FilterQuery<T> = {}): FilterQuery<T> {
  if (user.role === Role.SUPER_ADMIN) {
    return base;
  }

  //
  return { ...base, user: user._id };
}
