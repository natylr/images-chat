import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { checkExistsInUser } from '../../utils/validation/checkExistsInUser';

export const checkUserIdExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userID = req.params.userID || req.body.userID || req.query.userID; // Extract userID from request

    // Assuming validateUserStatus ensures userID is present in POST requests
    if (req.method === 'POST') {
      if (!mongoose.isValidObjectId(userID)) {
        return res.status(400).json({ error: 'Invalid userID format' });
      }

      const objectId = new mongoose.Types.ObjectId(userID);
      const userExists = await checkExistsInUser('_id', objectId);

      if (!userExists) {
        return res.status(404).json({ error: 'Invalid User Association: User with the provided userID does not exist' });
      }
    }

    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};
