import mongoose from "mongoose";
import { Document, Types } from 'mongoose';
import {checkUserIdExists} from '../../utils/validation/checkUserIdExists';

export const checkUserIdExistsMiddleware = async function(this:Document, next: Function)  {
  try {
    const userId = this._id as Types.ObjectId;
    const user = await checkUserIdExists(userId.toString());

    if (!user) {
      throw new mongoose.Error('Invalid User Association: User with the provided userID does not exist');
    }

    next(); 
  } catch (error) {
    next(error); 
  }
};
