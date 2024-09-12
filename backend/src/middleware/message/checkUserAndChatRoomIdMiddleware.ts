import { UserChatRoomValidator } from '../../services/userChatRoomValidator';
import { Document } from 'mongoose';
import { IUserChatRoomReference } from '../../interfaces/IUserChatRoomReference';

export const checkUserAndChatRoomIdMiddleware = async function (
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