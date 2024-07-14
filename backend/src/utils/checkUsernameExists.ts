import { User } from '../models/user';

export const checkUsernameExists = async (username: string): Promise<boolean> => {
  const user = await User.findOne({ username });
  return !!user;
};
