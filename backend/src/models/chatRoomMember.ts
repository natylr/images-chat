import { Schema, Document, model, Types } from 'mongoose';
import { checkUserIdExists } from '../middleware/checkUserIdExistsMiddleware';

export interface IChatRoomMember extends Document {
  userID: Types.ObjectId;
  chatRoomID: Types.ObjectId;
  joinedAt: Date;
}

const chatRoomMemberSchema = new Schema<IChatRoomMember>({
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  chatRoomID: { type: Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
  joinedAt: { type: Date, default: Date.now }
});

chatRoomMemberSchema.pre('save', checkUserIdExists)
export const ChatRoomMember = model<IChatRoomMember>('ChatRoomMember', chatRoomMemberSchema);
