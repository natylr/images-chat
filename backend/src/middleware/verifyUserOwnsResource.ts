import { Request } from 'express';

const verifyUserOwnsResource = (req: Request): boolean => {
  const userIdFromToken = req.userId; // This is set by the verifyJWT middleware
  const userIdFromBody = req.body.userID; // This is the userID in the request body

  return userIdFromToken === userIdFromBody;
};

export default verifyUserOwnsResource;
