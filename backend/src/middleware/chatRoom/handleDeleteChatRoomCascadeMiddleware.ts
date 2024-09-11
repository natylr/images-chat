import { Document, Types } from 'mongoose';
import {ChatRoomMember} from '../../models/chatRoomMember';
import {Message} from '../../models/message';


// Middleware function for cascading delete
export const handleDeleteChatRoomCascade  = async function(this: Document, next: Function) {
  const chatRoomId = this._id as Types.ObjectId;

  // Delete all UserChatRoom entries associated with this ChatRoom
  await ChatRoomMember.deleteMany({ chatRoomID: chatRoomId });

  // Delete all Message entries associated with this ChatRoom
  await Message.deleteMany({ chatRoomID: chatRoomId });

  next();
};
