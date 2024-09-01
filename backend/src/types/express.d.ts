import { Types } from "mongoose";

declare module 'express' {
  export interface Request {
    userId?: Types.ObjectId; // or Types.ObjectId if you're using MongoDB ObjectId
  }
}