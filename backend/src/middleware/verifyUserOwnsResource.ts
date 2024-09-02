import { IUserIdRequest } from '../interfaces/IUserIdRequest';
import { Types } from 'mongoose';

const verifyUserOwnsResource = (req: IUserIdRequest): boolean => {
  if ("body" in req && "userID" in req.body){
    const userIdFromToken = req.userId; // This is set by the verifyJWT middleware
    const userIdFromBody = req.body.userID; // This is the userID in the request body
    return userIdFromToken === userIdFromBody;
  }
  else{
    return false
  }
};

export default verifyUserOwnsResource;
