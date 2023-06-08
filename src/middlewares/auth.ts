import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import { ResponseTemplate } from '../types/response';

dotenv.config();
const secretKey = process.env.SECRET_KEY || 'cookecookwithhealthy';

export const generateAuthToken = (userID: string): string => {
  const token = jwt.sign({ userID: userID }, secretKey, {
    expiresIn: '1d'
  });
  return token;
};

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  let response: ResponseTemplate;
  if (!token) {
    response = {
      status: 401,
      message: 'Unauthorized',
      errors: 'Not authenticated'
    };
    return res.status(401).json(response);
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    //   req.user = decoded;
    next();
  } catch (error) {
    response = {
      status: 401,
      message: 'Unauthorized',
      errors: 'Invalid token'
    };
    return res.status(401).json(response);
  }
};
