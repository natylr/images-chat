import { User } from '../../models/user';

export const checkExistsInUser = async (fieldName: string, fieldValue: any): Promise<boolean> => {
  try {
    const user = await User.findOne({ [fieldName]: fieldValue });
    return !!user;
  } catch (error) {
    console.error(error);
    return false; // Handle errors gracefully
  }
};