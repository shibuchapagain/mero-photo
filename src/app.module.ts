import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';

import { DatabaseModule } from './config/database.config';
import { AdminModule } from './modules/admin/admin.module';

import { AuthGuard } from './common/guards/auth.guard';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { JwtService } from './shared/jwt.service';
import { MongooseModule } from '@nestjs/mongoose';
import { GlobalGuard } from './common/guards/global.guard';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/mero-photo'),
    ConfigModule.forRoot({ isGlobal: true }),
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
