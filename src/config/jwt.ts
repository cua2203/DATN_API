import jwt, { decode } from 'jsonwebtoken';
require('dotenv').config();

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, process.env.JWT_SECRET || '', {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

export const verifyToken = (token: string | undefined): any => {
  try {
    if (!token) {
      return null;
    }
    return jwt.verify(token, process.env.JWT_SECRET || '');
  } catch (error) {
    return null;
  }
};
