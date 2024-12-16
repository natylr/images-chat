import crypto from 'crypto';
import { apiService } from './apiService';

export const fetchPublicKey = async (): Promise<string> => {
  const response = await apiService.get('/public-key');
  return response.publicKey;
};

export const encryptPassword = (password: string, publicKey: string): string => {
  const buffer = Buffer.from(password, 'utf8');
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString('base64');
};
