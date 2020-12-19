import jwt from 'jsonwebtoken';
import { User } from '../types/db';
const secret = "SECRET";

export async function generateToken(user: User){
  async function signToken(user: User, subject="access_token", expiresIn=60*60*24) { 
    const { id, role, org_id } = user;
    return jwt.sign({
      id, role, org_id
    },
    secret,
    {
      expiresIn,
      issuer: 'random-admin',
      subject
    });
  }
  try {
    const access_token = await signToken(user);
    const refresh_token = await signToken(user, "refresh_token", 60 * 60 * 24 * 7);
    const decoded = jwt.verify(access_token, secret);
    return {
      access_token,
      refresh_token,
      decoded,
    }
  } catch (e){
    return {
      access_token: null,
      refresh_token: null,
    }
  }
}