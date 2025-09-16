import { StringValue } from 'ms';
import * as jwt from 'jsonwebtoken';
import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';

//
import { Role } from '../types/role';

export interface JwtPayload {
  _id: string;
  email: string;
  role: Role;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class JwtService {
  private readonly jwtSecret = process.env.JWT_SECRET;
  private readonly jwtAccessExpires = process.env.JWT_ACCESS_EXPIRES_IN;
  private readonly jwtRefreshExpires = process.env.JWT_REFRESH_EXPIRES_IN;
  private readonly logger = new Logger(JwtService.name);

  /**
   * Sign Token
   */
  signToken(payload: JwtPayload, expiresIn: number | string): string {
    const options: jwt.SignOptions = {
      algorithm: 'HS256',
      expiresIn: expiresIn as StringValue | number,
    };
    return jwt.sign(payload, this.jwtSecret, options);
  }

  /**
   * Verify JWT token
   */
  verifyToken<T extends JwtPayload = JwtPayload>(token: string): T {
    try {
      return jwt.verify(token, this.jwtSecret) as T;
    } catch (err) {
      this.logger.warn(`JWT verification failed: ${err}`);
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  /**
   * Decode token without verifying
   */
  decodeToken<T extends JwtPayload = JwtPayload>(token: string): T | null {
    const decoded = jwt.decode(token);
    return decoded ? (decoded as T) : null;
  }

  /**
   * Generate both access token and refresh token
   */
  generateTokens(payload: JwtPayload): Tokens {
    const accessToken = this.signToken(payload, this.jwtAccessExpires);
    const refreshToken = this.signToken(payload, this.jwtRefreshExpires);

    //
    return { accessToken, refreshToken };
  }

  /**
   * Refresh tokens using old refresh token
   */
  refreshTokens(refreshToken: string): Tokens {
    const payload = this.verifyToken<JwtPayload>(refreshToken);

    //
    return this.generateTokens({
      _id: payload._id,
      email: payload.email,
      role: payload.role,
    });
  }
}
