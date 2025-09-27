import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HistoryLogMethodEnum, HistoryLogTypeEnum, IUserSnapShot } from './history-log.type';

export type HistoryLogDocument = HydratedDocument<HistoryLog>;

@Schema({ timestamps: true })
export class HistoryLog {
  @Prop({ required: true, unique: true }) title: string;
  @Prop({ required: true, type: JSON }) userSnapShot: IUserSnapShot;
  @Prop({ required: true }) type: HistoryLogTypeEnum;
  @Prop({ required: true }) method: HistoryLogMethodEnum;
}

/** -------- Schema -------- */
export const HistoryLogSchema = SchemaFactory.createForClass(HistoryLog);
