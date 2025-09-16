import { Request } from 'express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const LoggedInUser = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();

  //
  return request.user;
});
