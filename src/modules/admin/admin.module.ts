import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    AuthModule,
    CategoryModule,
    RouterModule.register([
      {
        path: 'admin',
        children: [AuthModule, CategoryModule],
      },
    ]),
  ],
})

//
export class AdminModule {}
