import { Schema, Document, model, Types } from 'mongoose';
import { IUserChatRoomReference } from '../interfaces/IUserChatRoomReference';
import { checkChatRoomIdExistsMiddleware } from '..//middleware//chatRoom//checkChatRoomIdExistsMiddleware';
import { updateChatRoomTimestamp } from '../utils/transformation/updateChatRoomTimestamp';

export interface IChatRoomMember extends Document, IUserChatRoomReference {
  joinedAt: Date;
}

const chatRoomMemberSchema = new Schema<IChatRoomMember>({
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  chatRoomID: { type: Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
  joinedAt: { type: Date, default: Date.now },
});

chatRoomMemberSchema.post('save', async function (doc: IChatRoomMember) {
  await updateChatRoomTimestamp(doc.chatRoomID);
});

chatRoomMemberSchema.post('findOneAndUpdate', async function (doc: IChatRoomMember | null) {
  if (doc) {
    await updateChatRoomTimestamp(doc.chatRoomID);
  }
});
chatRoomMemberSchema.post('findOneAndDelete', async function (doc: IChatRoomMember | null) {
  if (doc) {
    await updateChatRoomTimestamp(doc.chatRoomID);
  }
});
export const ChatRoomMember = model<IChatRoomMember>('ChatRoomMember', chatRoomMemberSchema);
