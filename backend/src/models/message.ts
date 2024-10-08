import { Schema, Document, model, Types } from 'mongoose';
import { setupMessageMiddleware } from '../middleware/message/messageMiddleware';

export interface IMessage extends Document {
  chatRoomMemberId: Types.ObjectId;
  content: Types.ObjectId[];
  timeStamp: Date;
}

const messageSchema = new Schema<IMessage>({
  chatRoomMemberId: { type: Schema.Types.ObjectId, ref: 'ChatRoomMember', required: true },
  content: [{ type: Schema.Types.ObjectId, ref: 'Image', required: true }],
  timeStamp: { type: Date, default: Date.now }
});

async function initializeMessageModel() {
  await setupMessageMiddleware(messageSchema);
}

initializeMessageModel().catch(error => {
  console.error('Error setting up Message model:', error);
});

const Message = model<IMessage>('Message', messageSchema);

export { Message };
