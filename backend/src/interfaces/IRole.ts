import { Document, Types } from 'mongoose';
import { IPermission } from './IPermission';

export interface IRole extends Document {
  name: string;
  permissions: Types.ObjectId[]; // Reference to Permission schema
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
  parentRole?: Types.ObjectId;
}
