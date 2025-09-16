import { Controller, Post, Body, UsePipes } from '@nestjs/common';

import { AuthService } from './auth.service';
import { ApiResponse } from '../../../utils/http-response.util';
import { CustomZodValidationPipe } from '../../../pipelines/zod-custom.pipe';

import { LoginSchema, RegisterSchema } from './dto';
import type { ILoginDto, IRegisterDto } from './dto';
import { Public } from 'src/common/decorators/route-type.decorator';

/**
 * Auth Controller
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Register User
   */
  @Public()
  @Post('register')
  @UsePipes(new CustomZodValidationPipe(RegisterSchema))
  async register(@Body() data: IRegisterDto) {
    const response = await this.authService.register(data);

    //
    return new ApiResponse({
      message: 'User registered successfully',
      data: response,
    });
  }

  @Public()
  @Post('login')
  @UsePipes(new CustomZodValidationPipe(LoginSchema))
  async login(@Body() data: ILoginDto) {
    const response = await this.authService.login(data);

    //
    return new ApiResponse({
      message: 'User login successfully',
      data: response,
    });
  }
}
