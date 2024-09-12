import { updateChatRoomTimestamp } from '../../utils/transformation/updateChatRoomTimestamp';
import { Schema } from 'mongoose';
import { IMessage } from '../../models/message';

export async function setupMessageMiddleware(schema: Schema) {
  const { checkUserAndChatRoomIdMiddleware: checkUserAndChatRoomId } = await import('./checkUserAndChatRoomIdMiddleware');

  schema.pre('save', checkUserAndChatRoomId);

  schema.post('save', async function (doc: IMessage) {
    await updateChatRoomTimestamp(doc.chatRoomID);
  });

  schema.post('findOneAndUpdate', async function (doc: IMessage | null) {
    if (doc) {
      await updateChatRoomTimestamp(doc.chatRoomID);
    }
  });

  schema.post('findOneAndDelete', async function (doc: IMessage | null) {
    if (doc) {
      await updateChatRoomTimestamp(doc.chatRoomID);
    }
  });
}
