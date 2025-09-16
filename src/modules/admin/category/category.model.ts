import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({ required: true, unique: true }) title: string;
  @Prop({ required: true }) description: string;
  @Prop({ default: false }) isActive: boolean;
  @Prop() deletedAt?: Date;
}

/** -------- Schema -------- */
export const CategorySchema = SchemaFactory.createForClass(Category);
