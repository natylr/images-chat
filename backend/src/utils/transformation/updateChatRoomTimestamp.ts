import { Types } from 'mongoose';
import { ChatRoom } from '../../models/chatRoom';

export async function updateChatRoomTimestamp(chatRoomID: Types.ObjectId): Promise<void> {
  await ChatRoom.findByIdAndUpdate(chatRoomID, { updatedAt: new Date() });
}
