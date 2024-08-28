import { Schema, Document, model, Types, Model } from 'mongoose';
import { IUserChatRoomReference } from '../interfaces/IUserChatRoomReference';

export interface IMessage extends Document, IUserChatRoomReference {
  content: Types.ObjectId[];
  timestamp: Date;
}

const messageSchema = new Schema<IMessage>({
  userID: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  chatRoomID: { type: Schema.Types.ObjectId, ref: 'ChatRoom', required: true },
  content: [{ type: Schema.Types.ObjectId, ref: 'Image', required: true }],
  timestamp: { type: Date, default: Date.now }
});

let Message: Model<IMessage>;

async function setupMessageModel() {
  const { checkUserAndChatRoomId } = await import('../middleware/checkUserAndChatRoomId');
  messageSchema.pre('save', checkUserAndChatRoomId);
  Message = model<IMessage>('Message', messageSchema);
}

setupMessageModel().catch(error => {
  console.error('Error setting up Message model:', error);
});

export { Message };