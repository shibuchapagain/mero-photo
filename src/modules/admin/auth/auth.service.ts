import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';

import type { ILoginDto, IRegisterDto } from './dto';
import { User, UserDocument } from '../user/user.model';
import { JwtService } from '../../../shared/jwt.service';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument, User>,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async register(data: IRegisterDto) {
    const isEmailExist = await this.userModel.countDocuments({ email: new RegExp(`^${data.email}$`, 'i') });
    if (isEmailExist) throw new BadRequestException('Email already exist');

    //
    const user = await this.userModel.create({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
    });

    await this.redisService.set('register', JSON.stringify(user));

    //
    return {
      _id: user._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    };
  }

  async login(data: ILoginDto) {
    const user = await this.userModel.findOne({ email: new RegExp(`^${data.email}$`, 'i') });
    if (!user) throw new BadRequestException('Invalid credentials');

    if (!user.isActive) {
      throw new BadRequestException('You are In active, Please contact our support team');
    }

    if (user.isDeactivated) {
      throw new BadRequestException('You are Deactivated, Please contact our support team');
    }

    const isValidPassword = await user.comparePassword(user.password, data.password);
    if (!isValidPassword) throw new BadRequestException('Invalid credentials');

    const { accessToken, refreshToken } = this.jwtService.generateTokens({
      _id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    //
    return {
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }

  async getActiveUserById(id: string) {
    return await this.userModel.findById(id);
  }
}
