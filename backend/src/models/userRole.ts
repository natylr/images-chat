import { Schema, Document, model, Types } from 'mongoose';
import { IUserChatRoomReference } from '../interfaces/IUserChatRoomReference ';
import { checkUserAndChatRoomId } from '../middleware/checkUserAndChatRoomId';

export interface IUserRole extends Document, IUserChatRoomReference {
  role: string;
  assignedAt: Date;
}

const userRoleSchema = new Schema<IUserRole>({
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  chatRoomID: { type: Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
  role: { type: String, required: true },
  assignedAt: { type: Date, default: Date.now }
});
userRoleSchema.pre('save', checkUserAndChatRoomId)
export const UserRole = model<IUserRole>('UserRole', userRoleSchema);
