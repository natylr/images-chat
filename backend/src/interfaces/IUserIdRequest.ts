import { Request } from 'express';
import { Types } from 'mongoose';

export interface IUserIdRequest extends Request {
  userId?: Types.ObjectId;
}