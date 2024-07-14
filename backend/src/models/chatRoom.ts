import { Schema, Document, model } from 'mongoose';
import { handleDeleteChatRoomCascade } from '../middleware/handleDeleteChatRoomCascadeMiddleware';

export interface IChatRoom extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const chatRoomSchema = new Schema<IChatRoom>({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

chatRoomSchema.pre('deleteOne', handleDeleteChatRoomCascade);
chatRoomSchema.pre('deleteMany', handleDeleteChatRoomCascade);
chatRoomSchema.pre('findOneAndDelete', handleDeleteChatRoomCascade);

export const ChatRoom = model<IChatRoom>('ChatRoom', chatRoomSchema);
