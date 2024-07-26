import { Schema, Document, model, Types } from 'mongoose';
import { IUserChatRoomReference } from '../interfaces/IUserChatRoomReference ';

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

export const Message = model<IMessage>('Message', messageSchema);
