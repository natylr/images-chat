import crypto from 'crypto';
import fs from 'fs';
import path from 'path';

const privateKey = fs.readFileSync(path.resolve(__dirname, '../../../secrets/private_key.pem'), 'utf8');

export function decryptPassword(encryptedPassword: string): string {
  const buffer = Buffer.from(encryptedPassword, 'base64');
  const decrypted = crypto.privateDecrypt(privateKey, buffer);
  return decrypted.toString('utf8');
}
