import { UserChatRoomValidator } from '../services/UserChatRoomValidator';
import { Document } from 'mongoose';
import { IUserChatRoomReference } from '../interfaces/IUserChatRoomReference';

export const checkUserAndChatRoomId = async function (
    this: Document & IUserChatRoomReference,
    next: Function
) {
    try {
        await UserChatRoomValidator.validateUserAndChatRoom(this.userID, this.chatRoomID);
        next();
    } catch (error) {
        next(error);
    }
};