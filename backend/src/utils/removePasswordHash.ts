import { IUser } from "../models/user";
import { Document } from 'mongoose';

export type removePasswordHashType = Omit<IUser, 'passwordHash'> & Document

export const removePasswordHash = (user: IUser): removePasswordHashType => {
    const userObject = user.toObject(); // Convert to plain object
    const { passwordHash, ...rest } = userObject;
    return rest as Omit<IUser, 'passwordHash'> & Document;
  };

