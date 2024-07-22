import mongoose from "mongoose";
import { Document, Types } from 'mongoose';

import { User } from "../models/user";

export const checkUserIdExists = async function(this:Document, next: Function)  {
  try {
    const userId = this._id as Types.ObjectId;
    const user = await User.findById(userId);

    if (!user) {
      throw new mongoose.Error('Invalid User Association: User with the provided userID does not exist');
    }

    next(); 
  } catch (error) {
    next(error); 
  }
};
