import { Request, Response, NextFunction } from 'express';
import { checkExistsInUser } from '../../utils/validation/checkExistsInUser';

export const isUsernameAvailableMiddleware  = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  if (await checkExistsInUser("username", username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  next();
};
