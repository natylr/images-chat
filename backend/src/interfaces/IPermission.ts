import { Document } from 'mongoose';

export interface IPermission extends Document {
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
}