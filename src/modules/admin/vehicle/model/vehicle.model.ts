import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type VehicleDocument = HydratedDocument<Vehicle>;

@Schema({ timestamps: true })
export class Vehicle {
  @Prop({ required: true, unique: true }) name: string;
  @Prop({ required: true }) description: string;
  @Prop({ required: true }) model: string;
  @Prop({ required: true }) specifications: string;
  @Prop({ required: true }) location: string;
  @Prop({ required: true }) rentalTerms: string;
  @Prop({ default: false }) isFeatured: boolean;
  @Prop({ default: false }) isAvailable: boolean;
  @Prop({ type: JSON }) capacity: JSON;
  @Prop({ type: Types.ObjectId, ref: 'Category', required: true }) category: Types.ObjectId;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) user: Types.ObjectId;
  @Prop({ type: JSON }) createdBy: JSON;
  @Prop({ type: JSON }) updatedBy: JSON;
  @Prop({ type: Date }) deletedAt?: Date;
}

/** -------- Schema -------- */
export const VehicleSchema = SchemaFactory.createForClass(Vehicle);
