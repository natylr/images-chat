import mongoose, { Document, Types } from 'mongoose';
import { checkChatRoomIdExists } from '../utils/checkChatRoomIdExists';
import { checkUserIdExists } from '../utils/checkUserIdExists';
import { IUserChatRoomReference } from '../interfaces/IUserChatRoomReference ';

export const checkUserAndChatRoomId = async function(
  this: Document & IUserChatRoomReference, 
  next: Function
) {
  try {
    const userId = this.userID as Types.ObjectId;
    const chatRoomId = this.chatRoomID as Types.ObjectId;

    const [isUserValid, isChatRoomValid] = await Promise.all([
      checkUserIdExists(userId.toString()),
      checkChatRoomIdExists(chatRoomId.toString())
    ]);

    if (!isUserValid) {
      throw new mongoose.Error('Invalid User Association: User with the provided userID does not exist');
    }

    if (!isChatRoomValid) {
      throw new mongoose.Error('Invalid ChatRoom Association: ChatRoom with the provided chatRoomID does not exist');
    }

    next(); 
  } catch (error) {
    next(error); 
  }
};
