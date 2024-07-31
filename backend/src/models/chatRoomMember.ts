import { Schema, Document, model, Types } from 'mongoose';
import { IUserChatRoomReference } from '../interfaces/IUserChatRoomReference ';
import { checkUserAndChatRoomId } from '../middleware/checkUserAndChatRoomId';

export interface IChatRoomMember extends Document, IUserChatRoomReference {
  joinedAt: Date;
}

const chatRoomMemberSchema = new Schema<IChatRoomMember>({
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  chatRoomID: { type: Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
  joinedAt: { type: Date, default: Date.now },
});

chatRoomMemberSchema.pre('save', checkUserAndChatRoomId);

export const ChatRoomMember = model<IChatRoomMember>('ChatRoomMember', chatRoomMemberSchema);
