import { Schema, Document, model, Types } from 'mongoose';

export interface IUserRole extends Document {
  userID: Types.ObjectId;
  chatRoomID: Types.ObjectId;
  role: string;
  assignedAt: Date;
}

const userRoleSchema = new Schema<IUserRole>({
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  chatRoomID: { type: Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
  role: { type: String, required: true },
  assignedAt: { type: Date, default: Date.now }
});

export const UserRole = model<IUserRole>('UserRole', userRoleSchema);
