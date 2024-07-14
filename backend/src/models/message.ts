import { Schema, Document, model, Types } from 'mongoose';

export interface IMessage extends Document {
  userID: Types.ObjectId;
  chatRoomID: Types.ObjectId;
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
