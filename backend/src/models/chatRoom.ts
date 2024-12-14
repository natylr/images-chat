import { Schema, Document, model } from 'mongoose';
import { handleDeleteChatRoomCascadeMiddleware } from '../middleware/chatRoom/handleDeleteChatRoomCascadeMiddleware';

export interface IChatRoom extends Document {
  name: string;
  primaryImageURL: string;
  createdAt: Date;
  updatedAt: Date;
  type: 'group' | 'direct';
}

const chatRoomSchema = new Schema<IChatRoom>({
  name: { type: String, required: true },
  primaryImageURL: { type: String },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
  type: { type: String, enum: ['group', 'direct'], default: 'group', required: true }
});

chatRoomSchema.pre('deleteOne', handleDeleteChatRoomCascadeMiddleware);
chatRoomSchema.pre('deleteMany', handleDeleteChatRoomCascadeMiddleware);
chatRoomSchema.pre('findOneAndDelete', handleDeleteChatRoomCascadeMiddleware);

export const ChatRoom = model<IChatRoom>('ChatRoom', chatRoomSchema);
