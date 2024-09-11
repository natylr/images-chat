import { Schema, Document, model } from 'mongoose';
import { handleDeleteChatRoomCascade } from '../middleware/chatRoom/handleDeleteChatRoomCascadeMiddleware';

export interface IChatRoom extends Document {
  name: string;
  primaryImageURL: string,
  createdAt: Date;
  updatedAt: Date;
}

const chatRoomSchema = new Schema<IChatRoom>({
  name: { type: String, required: true },
  primaryImageURL: { type: String},
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now }
});

chatRoomSchema.pre('deleteOne', handleDeleteChatRoomCascade);
chatRoomSchema.pre('deleteMany', handleDeleteChatRoomCascade);
chatRoomSchema.pre('findOneAndDelete', handleDeleteChatRoomCascade);

export const ChatRoom = model<IChatRoom>('ChatRoom', chatRoomSchema);
