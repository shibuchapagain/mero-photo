import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { HistoryLog, HistoryLogSchema } from './history-log.model';
import { HistoryLogService } from '../history-logs/history-log.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: HistoryLog.name, schema: HistoryLogSchema }]), HistoryLogService],
  controllers: [],
  providers: [HistoryLogService],
  exports: [HistoryLogService],
})

//
export class HistoryLogModule {}
