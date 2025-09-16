import * as argon from 'argon2';
import { HydratedDocument, Model, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Role } from '../../../types/role';

/** -------- Types -------- */
export interface UserMethods {
  comparePassword(plain: string): Promise<boolean>;
}

export interface UserModel extends Model<UserDocument, UserMethods> {
  softDelete(id: Types.ObjectId): Promise<any>;
}

export type UserDocument = HydratedDocument<User, UserMethods>;

/** -------- Class -------- */
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true }) firstName: string;
  @Prop({ required: true }) lastName: string;
  @Prop({ required: true, unique: true, trim: true }) email: string;
  @Prop({ required: true }) password: string;
  @Prop({ type: String, enum: Role, default: Role.USER }) role: Role;
  @Prop() address?: string;
  @Prop() imageUrl?: string;
  @Prop() contactNumber?: string;
  @Prop({ default: false }) isVerified: boolean;
  @Prop({ type: [String], default: [] }) documentUrls: string[];
  @Prop({ default: true }) isActive: boolean;
  @Prop({ default: false }) isDeactivated: boolean;
  @Prop() companyName?: string;
  @Prop() deletedAt?: Date;
}

/** -------- Schema -------- */
export const UserSchema = SchemaFactory.createForClass(User);

/** Hash password before save */
UserSchema.pre<UserDocument>('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await argon.hash(this.password);
    next();
  } catch (err) {
    next(err as Error);
  }
});

/** Static method */
UserSchema.statics.softDelete = async function (id: Types.ObjectId) {
  return await this.updateOne({ _id: id }, { $set: { isActive: false, deletedAt: new Date() } });
};

/** Instance method */
UserSchema.methods.comparePassword = async function (this: UserDocument, plain: string): Promise<boolean> {
  return await argon.verify(this.password, plain);
};
