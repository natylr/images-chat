import { User } from '../../models/user';

export const checkUserIdExists = async (userId: string): Promise<boolean> => {
    const user = await User.findById(userId);
  return !!user;
};
