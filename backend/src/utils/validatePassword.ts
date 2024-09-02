import bcrypt from 'bcryptjs';

export const validatePassword = async (providedPassword: string, storedHashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(providedPassword, storedHashedPassword);
};
