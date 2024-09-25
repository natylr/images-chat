import { Request, Response, NextFunction } from 'express';
import { checkExistsInUser } from '../../utils/validation/checkExistsInUser';

export const checkNotDuplicateEmailPhoneMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, phone } = req.body;

    const emailExists = await checkExistsInUser('email', email);
    const phoneExists = await checkExistsInUser('phone', phone);

    if (emailExists) {
      return res.status(400).json({ message: 'Email number already in use' });
    }
    if (phoneExists) {
        return res.status(400).json({ message: 'Phone number already in use' });
      }

    next(); 
  } catch (error) {
    res.status(500).json({ message: 'Error checking for duplicate user', error });
  }
};
