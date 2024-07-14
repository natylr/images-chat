import { Document, Types } from 'mongoose';
import {ChatRoomMember} from '../models/chatRoomMember';
import {UserStatus} from '../models/userStatus';
import {UserRole} from '../models/userRole'

// Middleware function for cascading delete
export const handleDeleteUserCascade  = async function(this: Document, next: Function) {
  const userId = this._id as Types.ObjectId;

  // Delete all UserChatRoom entries associated with this User
  await ChatRoomMember.deleteMany({ userID: userId });

  // Delete all UserStatus entries associated with this User
  await UserStatus.deleteMany({ userID: userId });

   // Delete all UserRole entries associated with this User
   await UserRole.deleteMany({ userID: userId });
   
  next();
};
