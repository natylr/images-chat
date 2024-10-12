import { updateChatRoomTimestamp } from '../../utils/transformation/updateChatRoomTimestamp';
import { Schema } from 'mongoose';
import { IMessage } from '../../models/message';
import { ChatRoomMember } from '../../models/chatRoomMember';

async function updateChatRoomTimestampFromMessage(doc: IMessage) {
  try {
    await doc.populate('chatRoomMemberId');
    const chatRoomMember = doc.chatRoomMemberId;
    if (chatRoomMember instanceof ChatRoomMember) {
      const chatRoomID = chatRoomMember.chatRoomID;
      await updateChatRoomTimestamp(chatRoomID);
    }
  } catch (error) {
    console.error('Error updating ChatRoom timestamp:', error);
  }
}

export async function setupMessageMiddleware(schema: Schema) {
  const { checkUserAndChatRoomIdMiddleware: checkUserAndChatRoomId } = await import('./checkUserAndChatRoomIdMiddleware');

  // Pre-save hook to check user and chat room IDs exists
  schema.pre('save', checkUserAndChatRoomId);

  schema.post('save', async function (doc: IMessage) {
    await updateChatRoomTimestampFromMessage(doc);
  });

  schema.post('findOneAndUpdate', async function (doc: IMessage | null) {
    if (doc) {
      await updateChatRoomTimestampFromMessage(doc);
    }
  });

  schema.post('findOneAndDelete', async function (doc: IMessage | null) {
    if (doc) {
      await updateChatRoomTimestampFromMessage(doc);
    }
  });
}
