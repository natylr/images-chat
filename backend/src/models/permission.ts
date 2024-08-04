import { Schema, model } from 'mongoose';
import { IPermission } from '../interfaces/IPermission';

const permissionSchema = new Schema<IPermission>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

export const Permission = model<IPermission>('Permission', permissionSchema);
