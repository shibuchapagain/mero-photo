import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { Role } from '../../types/role';
import type { IUser } from '../../types/global';
import { IS_PUBLIC_KEY } from '../decorators/route-type.decorator';

import { JwtService } from '../../shared/jwt.service';
import { MongoDBService } from 'src/shared/mongodb.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly databaseService: MongoDBService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();

    // check bearer token:
    const bearerToken = this.extractBearerToken(request);
    if (!bearerToken) throw new UnauthorizedException('Session expired, Please login again!');

    // Extract the route: admin / user
    const path = request.path.split('/')[2];
    if (path !== 'admin' && path !== 'user') {
      throw new BadRequestException('Invalid roles');
    }

    switch (path) {
      case 'admin': {
        if (!bearerToken) throw new UnauthorizedException('Session expired, Please login again!');
        const admin = await this.activeAdmin(bearerToken);
        request.user = admin;
        break;
      }

      case 'user': {
        if (!bearerToken) throw new UnauthorizedException('Session expired, Please login again!');
        const admin = await this.activeUser(bearerToken);
        request.user = admin;
        break;
      }
    }

    //
    return true;
  }

  private async activeAdmin(token: string): Promise<IUser> {
    const decoded = this.jwtService.decodeToken(token);

    if (!decoded) throw new UnauthorizedException('Session expired, Please login again!');
    if (![Role.ADMIN, Role.SUPER_ADMIN].includes(decoded?.role)) {
      throw new ForbiddenException('Insufficient role');
    }

    const user = await this.databaseService.userModel.findById(decoded._id);
    if (!user) throw new UnauthorizedException('Session expired, Please login again!');

    //
    return {
      _id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
  }

  private async activeUser(token: string): Promise<IUser> {
    const decoded = this.jwtService.decodeToken(token);

    if (!decoded) throw new UnauthorizedException('Session expired, Please login again!');
    if (![Role.USER, Role.SUPER_ADMIN].includes(decoded?.role)) {
      throw new ForbiddenException('Insufficient role');
    }

    const user = await this.databaseService.userModel.findById(decoded._id);
    if (!user) throw new UnauthorizedException('Session expired, Please login again!');

    //
    return {
      _id: user._id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
  }

  private extractBearerToken(req: Request): string | null {
    const authHeader = req.headers.authorization;
    if (!authHeader) return null;
    const [scheme, token] = authHeader.split(' ');

    //
    return scheme === 'Bearer' && token ? token : null;
  }
}
