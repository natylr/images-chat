import { Schema, Document, model, Types, Model } from 'mongoose';
import { IUserChatRoomReference } from '../interfaces/IUserChatRoomReference';
import { setupMessageMiddleware } from '../middleware/messageMiddleware';

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

async function initializeMessageModel() {
  await setupMessageMiddleware(messageSchema);
}

initializeMessageModel().catch(error => {
  console.error('Error setting up Message model:', error);
});

const Message = model<IMessage>('Message', messageSchema);

export { Message };
