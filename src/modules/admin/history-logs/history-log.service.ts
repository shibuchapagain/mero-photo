import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { HistoryLog } from './history-log.model';
import type { HistoryLogMethodEnum, HistoryLogTypeEnum, IUserSnapShot } from './history-log.type';

@Injectable()
export class HistoryLogService {
  constructor(@InjectModel(HistoryLog.name) private historyLogModel: Model<HistoryLog>) {}

  /**
   * Create History Log
   */
  async createHistory({
    title,
    userSnapShot,
    type,
    method,
  }: {
    title: string;
    userSnapShot: IUserSnapShot;
    type: HistoryLogTypeEnum;
    method: HistoryLogMethodEnum;
  }) {
    const historyLog = await this.historyLogModel.create({
      title,
      userSnapShot,
      type,
      method,
    });

    if (!historyLog) {
      throw new BadRequestException('something went wrong');
    }

    //
    return historyLog;
  }
}
