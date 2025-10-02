import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';

import { DatabaseModule } from './config/database.config';
import { AdminModule } from './modules/admin/admin.module';

import { AuthGuard } from './common/guards/auth.guard';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { JwtService } from './shared/jwt.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GlobalGuard } from './common/guards/global.guard';
import { RedisModule } from './redis/redis.module';
// import * as dotenv from 'dotenv';
// dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    // MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI');
        return { uri };
      },
      inject: [ConfigService],
    }),
    RedisModule,
    DatabaseModule,
    AdminModule,
  ],
  providers: [
    JwtService,
    AuthGuard,
    {
      provide: APP_GUARD,
      useClass: GlobalGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
