import { Schema, Document, model } from 'mongoose';
import { handleDeleteUserCascade}from '../middleware/handleDeleteUserCascadeMiddleware';

export interface IUser extends Document {
  username: string;
  fname: string;
  lname: string;
  email: string;
  hashedPassword: string;
  address: string;
  city: string;
  phone: string;
  avatarUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  hashedPassword: { type: String, required: true },
  address: { type: String},
  city: { type: String},
  phone: { type: String, required: true },
  avatarUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
userSchema.pre('deleteOne', handleDeleteUserCascade);
userSchema.pre('deleteMany', handleDeleteUserCascade);
userSchema.pre('findOneAndDelete', handleDeleteUserCascade);

export const User = model<IUser>('User', userSchema);
