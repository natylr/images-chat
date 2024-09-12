import { Request, Response, NextFunction } from 'express';
import { checkUsernameExists } from '../../utils/validation/checkUsernameExists';

export const isUsernameAvailableMiddleware  = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  if (await checkUsernameExists(username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  next();
};
