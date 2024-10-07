import { Request, Response, NextFunction } from 'express';

export const validateUserStatus = (req: Request, res: Response, next: NextFunction) => {
  const { userID, mediaUrl } = req.body;

  if (req.method === 'POST') {
    if (!userID || !mediaUrl) {
      return res.status(400).json({ error: 'All fields (userID, mediaUrl) are required.' });
    }
  } else {
    if (!mediaUrl) {
      return res.status(400).json({ error: 'mediaUrl is required.' });
    }
  }

  next();
};
