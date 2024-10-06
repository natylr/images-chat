import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { checkExistsInUser } from '../../utils/validation/checkExistsInUser';

export const checkUserIdExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId || req.body.userId || req.query.userId; // Extract userId from request
    if (!userId) {
      return res.status(400).json({ error: 'UserID is required' });
    }

    const objectId = new mongoose.Types.ObjectId(userId);
    const userExists = await checkExistsInUser('_id', objectId);

    if (!userExists) {
      return res.status(404).json({ error: 'Invalid User Association: User with the provided userID does not exist' });
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};
