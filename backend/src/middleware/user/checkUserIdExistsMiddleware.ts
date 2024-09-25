import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { checkExistsInUser } from '../../utils/validation/checkExistsInUser';

export const checkUserIdExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.userId || req.body.userId || req.query.userId;

        if (!userId) {
            return res.status(400).json({ error: 'UserID is required' });
        }

        const user = await checkExistsInUser("userId", userId.toString());

        if (!user) {
            return res.status(404).json({ error: 'Invalid User Association: The provided UserID does not exist in our database.' });
        }

        next();
    } catch (error) {
        if (error instanceof mongoose.Error) {
            return res.status(500).json({ error: 'Database error occurred while checking UserID existence.' });
        }
        next(error);
    }
};