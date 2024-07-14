import { Schema, Document, model, Types } from 'mongoose';

export interface IUserStatus extends Document {
  userID: Types.ObjectId;
  status: string;
  updatedAt: Date;
}

const userStatusSchema = new Schema<IUserStatus>({
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

export const UserStatus = model<IUserStatus>('UserStatus', userStatusSchema);
