import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../secret';

const verifyJWTMiddleware = (req: any, res: any, next: any) => {
  const authHeader = req.headers?.authorization || req.headers?.Authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, JWT_SECRET, (err: jwt.VerifyErrors | null, decoded: any) => {
    if (err) {
      if (err.name === 'JsonWebTokenError') {
        return res.status(403).json({ message: 'Invalid Token', data: 'Forbidden' });
      } else {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }

    req.userId = decoded.userId;
    next();
  });
};

export default verifyJWTMiddleware;

