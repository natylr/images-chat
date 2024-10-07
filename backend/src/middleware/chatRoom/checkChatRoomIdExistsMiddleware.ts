import mongoose from "mongoose";
import { Document, Types } from 'mongoose';
import {checkChatRoomIdExists} from '../../utils/validation/checkChatRoomIdExists';

export const checkChatRoomIdExistsMiddleware = async function(this:Document, next: Function)  {
  try {
    const chatRoomId = this._id as Types.ObjectId;
    const chatRoom = await checkChatRoomIdExists(chatRoomId.toString());

    if (!chatRoom) {
      throw new mongoose.Error('Invalid ChatRoom Association: ChatRoom with the provided chatRoomID does not exist');
    }

    next(); 
  } catch (error) {
    next(error); 
  }
};
