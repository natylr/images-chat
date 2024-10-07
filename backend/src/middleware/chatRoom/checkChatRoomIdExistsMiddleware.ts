import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { checkChatRoomIdExists } from '../../utils/validation/checkChatRoomIdExists';

export const checkChatRoomIdExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { chatRoomID } = req.body || req.params || req.query; // Extract chatRoomID from any source

        if (!chatRoomID) {
            return res.status(400).json({ error: 'chatRoomID is required' });
        }

        const chatRoomExists = await checkChatRoomIdExists(chatRoomID);

        if (!chatRoomExists) {
            return res.status(404).json({ error: 'ChatRoom with the provided ID does not exist' });
        }

        next();
    } catch (error) {
        next(error);
    }
};