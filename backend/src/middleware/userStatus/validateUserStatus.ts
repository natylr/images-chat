import { Request, Response, NextFunction } from 'express';

export const validateUserStatus = (req: Request, res: Response, next: NextFunction) => {
  const { mediaUrl } = req.body;

  if ( !mediaUrl) {
    return res.status(400).json({ error: 'All fields (userID, mediaUrl) are required.' });
  }

  next();
};
