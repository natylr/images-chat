import { Schema, Document, model, Types } from 'mongoose';
import { checkUserIdExists } from '../middleware/checkUserIdExistsMiddleware';
import { checkChatRoomIdExists } from '../middleware/checkChatRoomIdExistsMiddleware';
import { IUserChatRoomReference } from '../interfaces/IUserChatRoomReference ';

export interface IChatRoomMember extends Document, IUserChatRoomReference {
  joinedAt: Date;
}

const chatRoomMemberSchema = new Schema<IChatRoomMember>({
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  chatRoomID: { type: Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
  joinedAt: { type: Date, default: Date.now },
});

chatRoomMemberSchema.pre('save', async function (next) {
  const checkUserIdExistsBound = checkUserIdExists.bind(this);
  const checkChatRoomIdExistsBound = checkChatRoomIdExists.bind(this);
  try {
    await checkUserIdExistsBound(this.userID);
    await checkChatRoomIdExistsBound(this.chatRoomID);
  } catch (error) {
    return next(error);
  }
  next();
});

export const ChatRoomMember = model<IChatRoomMember>('ChatRoomMember', chatRoomMemberSchema);
