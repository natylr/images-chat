import { Schema, Document, model, Types } from 'mongoose';
import { IUserChatRoomReference } from '../interfaces/IUserChatRoomReference';
import { checkChatRoomIdExistsMiddleware } from '../middleware/chatRoom/checkChatRoomIdExistsMiddleware';

export interface IUserRole extends Document, IUserChatRoomReference {
  role: Types.ObjectId;
  assignedAt: Date;
}

const userRoleSchema = new Schema<IUserRole>({
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  chatRoomID: { type: Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
  role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
  assignedAt: { type: Date, default: Date.now }
});
export const UserRole = model<IUserRole>('UserRole', userRoleSchema);
