import { Request } from 'express';
import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

import { Role } from 'src/types/role';
import { IUser } from 'src/types/global';

export const AdminUser = createParamDecorator((data: unknown, ctx: ExecutionContext): IUser => {
  const request = ctx.switchToHttp().getRequest<Request>();

  if (![Role.ADMIN, Role.SUPER_ADMIN].includes(request?.user?.role)) {
    throw new UnauthorizedException('Invalid user--');
  }

  //
  return request.user;
});
