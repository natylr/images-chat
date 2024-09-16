import { Schema, Document, model, Types } from 'mongoose';
import { checkUserIdExists } from '../utils/validation/checkUserIdExists';

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

// Pre-save hook to validate if the user exists
userStatusSchema.pre('save', async function (next) {
  const userExists = await checkUserIdExists(this.userID.toString());
  if (!userExists) {
    const error = new Error('User does not exist');
    return next(error);
  }
  next();
});

export const UserStatus = model<IUserStatus>('UserStatus', userStatusSchema);
