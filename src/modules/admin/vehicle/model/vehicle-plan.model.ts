import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type VehiclePlanDocument = HydratedDocument<VehiclePlan>;

export enum VehiclePlanEnum {
  PER_HOUR = 'PER_HOUR',
  PER_DAY = 'PER_DAY',
  PER_WEEK = 'PER_WEEK',
  PER_MONTH = 'PER_MONTH',
  PER_YEAR = 'PER_YEAR',
}

@Schema({ timestamps: true })
export class VehiclePlan {
  @Prop({ required: true, type: Number }) charge: number;
  @Prop({ required: true, enum: VehiclePlanEnum }) enum: VehiclePlanEnum;
  @Prop({ required: true }) description: string;
  @Prop({ type: Types.ObjectId, ref: 'Vehicle', required: true }) vehicle: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) user: Types.ObjectId;
  @Prop({ type: JSON }) createdBy: JSON;
  @Prop({ type: JSON }) updatedBy: JSON;
  @Prop({ type: Date }) deletedAt?: Date;
}

/** -------- Schema -------- */
export const VehiclePlanSchema = SchemaFactory.createForClass(VehiclePlan);
