import crypto from 'crypto';

const SALT = 'SALT';
const ITERATIONS = 1109;
export function encryptPassword(password: string): string{
  return crypto.pbkdf2Sync(password, SALT, ITERATIONS, 64, 'sha512').toString('base64')
}
