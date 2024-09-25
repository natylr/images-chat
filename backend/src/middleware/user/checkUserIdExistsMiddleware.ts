import { Request, Response, NextFunction } from 'express';
import { checkUserIdExists } from '../../utils/validation/checkUserIdExists';
import mongoose from 'mongoose';

export const checkUserIdExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.params.userId || req.body.userId || req.query.userId; // Extract userId from request

    if (!userId) {
      return res.status(400).json({ error: 'UserID is required' });
    }

    const user = await checkUserIdExists(userId);

    if (!user) {
      return res.status(404).json({ error: 'Invalid User Association: User with the provided userID does not exist' });
    }

    next(); // User exists, proceed to the next middleware or route handler
  } catch (error) {
    if (error instanceof mongoose.Error) {
      return res.status(500).json({ error: 'Database error' });
    }
    next(error); // Pass error to the error handling middleware
  }
};
