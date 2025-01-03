import { checkChatRoomIdExists } from '../utils/validation/checkChatRoomIdExists';
import { checkExistsInUser } from '../utils/validation/checkExistsInUser';
import mongoose, { Types } from 'mongoose';

export class UserChatRoomValidator {
    static async validateUserAndChatRoom(userID: Types.ObjectId, chatRoomID: Types.ObjectId) {
        const [isUserValid, isChatRoomValid] = await Promise.all([
            checkExistsInUser("userId", userID.toString()),
            checkChatRoomIdExists(chatRoomID.toString())
        ]);

        if (!isUserValid) {
            throw new mongoose.Error('Invalid User Association: User with the provided userID does not exist');
        }

        if (!isChatRoomValid) {
            throw new mongoose.Error('Invalid ChatRoom Association: ChatRoom with the provided chatRoomID does not exist');
        }
    }
}