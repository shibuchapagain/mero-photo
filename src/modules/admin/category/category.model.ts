import { HydratedDocument, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, unique: true }) title: string;
  @Prop({ required: true }) description: string;
  @Prop({ default: false }) isActive: boolean;
  @Prop() deletedAt?: Date;
  @Prop({ type: Types.ObjectId, ref: 'User', required: true }) user: Types.ObjectId;
}

/** -------- Schema -------- */
export const CategorySchema = SchemaFactory.createForClass(Category);
