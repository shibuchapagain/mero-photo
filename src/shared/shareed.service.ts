// import { StringValue } from 'ms';
// import * as jwt from 'jsonwebtoken';
// import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';

// import { envConfig } from '../config/env.validation';

// export interface JwtPayload {
//   id: string;
//   email: string;
//   role: string;
// }

// export interface Tokens {
//   accessToken: string;
//   refreshToken: string;
// }

// @Injectable()
// export class JwtService {
//   private readonly secret: string = envConfig.JWT_SECRET;
//   private readonly accessExpiresIn: string =
//     envConfig.JWT_ACCESS_TOKEN_EXPIRES_IN;
//   private readonly refreshExpiresIn: string =
//     envConfig.JWT_REFRESH_TOKEN_EXPIRES_IN;
//   private readonly logger = new Logger(JwtService.name);

//   /**
//    * Sign Token
//    */
//   signToken(payload: JwtPayload, expiresIn: number | string): string {
//     const options: jwt.SignOptions = {
//       algorithm: 'HS256',
//       expiresIn: expiresIn as StringValue | number,
//     };
//     return jwt.sign(payload, this.secret, options);
//   }

//   /**
//    * Verify JWT token
//    */
//   verifyToken<T extends JwtPayload = JwtPayload>(token: string): T {
//     try {
//       return jwt.verify(token, this.secret) as T;
//     } catch (err) {
//       this.logger.warn(`JWT verification failed: ${err}`);
//       throw new UnauthorizedException('Invalid or expired token');
//     }
//   }

//   /**
//    * Decode token without verifying
//    */
//   decodeToken<T extends JwtPayload = JwtPayload>(token: string): T | null {
//     const decoded = jwt.decode(token);
//     return decoded ? (decoded as T) : null;
//   }

//   /**
//    * Generate both access token and refresh token
//    */
//   generateTokens(payload: JwtPayload): Tokens {
//     const accessToken = this.signToken(payload, this.accessExpiresIn);
//     const refreshToken = this.signToken(payload, this.refreshExpiresIn);

//     //
//     return { accessToken, refreshToken };
//   }

//   /**
//    * Refresh tokens using old refresh token
//    */
//   refreshTokens(refreshToken: string): Tokens {
//     const payload = this.verifyToken<JwtPayload>(refreshToken);

//     //
//     return this.generateTokens({
//       id: payload.id,
//       email: payload.email,
//       role: payload.role,
//     });
//   }
// }
