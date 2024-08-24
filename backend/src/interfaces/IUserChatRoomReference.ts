import { Types } from "mongoose";

export interface IUserChatRoomReference{
    userID: Types.ObjectId;
    chatRoomID: Types.ObjectId;
  }