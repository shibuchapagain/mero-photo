import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { Category, CategorySchema } from './category.model';
import { HistoryLogService } from '../history-logs/history-log.service';
import { HistoryLog, HistoryLogSchema } from '../history-logs/history-log.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
    MongooseModule.forFeature([{ name: HistoryLog.name, schema: HistoryLogSchema }]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService, HistoryLogService],
  exports: [CategoryService],
})

//
export class CategoryModule {}
