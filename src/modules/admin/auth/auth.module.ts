import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';

import { AuthService } from './auth.service';
import { JwtService } from '../../../shared/jwt.service';
import { User, UserSchema } from '../user/user.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [AuthController],
  providers: [AuthService, JwtService],
  exports: [AuthService],
})

//
export class AuthModule {}
