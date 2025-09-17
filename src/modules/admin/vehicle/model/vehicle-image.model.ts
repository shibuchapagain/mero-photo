import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type VehicleImageDocument = HydratedDocument<VehicleImage>;

@Schema({ timestamps: true })
export class VehicleImage {
  @Prop({ required: true }) imageUrl: string;
  @Prop({ required: true }) name: string;
  @Prop({ type: Types.ObjectId, ref: 'Vehicle', required: true }) vehicle: Types.ObjectId;
}

/** -------- Schema -------- */
export const VehicleImageSchema = SchemaFactory.createForClass(VehicleImage);
