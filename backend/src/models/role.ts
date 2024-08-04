import { Schema, model } from 'mongoose';
import { IRole } from '../interfaces/IRole';

const roleSchema = new Schema<IRole>({
  name: { type: String, required: true, unique: true },
  permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }],
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
  parentRole: { type: Schema.Types.ObjectId, ref: 'Role' } // For hierarchical roles
});

export const Role = model<IRole>('Role', roleSchema);
