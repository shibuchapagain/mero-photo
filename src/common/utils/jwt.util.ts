import jwt from 'jsonwebtoken';
import { UnauthorizedException } from '@nestjs/common';

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';

export function verifyToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    //
    return decoded;
  } catch {
    throw new UnauthorizedException('Invalid or expired token');
  }
}
