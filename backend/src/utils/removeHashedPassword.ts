import { IUser } from "../models/user";
import { Document } from 'mongoose';

export type removeHashedPasswordType = Omit<IUser, 'hashedPassword'> & Document

export const removeHashedPassword = (user: IUser): removeHashedPasswordType => {
    const userObject = user.toObject(); // Convert to plain object
    const { hashedPassword, ...rest } = userObject;
    return rest as Omit<IUser, 'hashedPassword'> & Document;
  };

