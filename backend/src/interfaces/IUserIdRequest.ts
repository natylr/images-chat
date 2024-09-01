import { Request } from 'express';
import { Types } from 'mongoose';

export interface IUserIdRequest<T = any> extends Request {
  userId?: Types.ObjectId;
  body?: T;
}