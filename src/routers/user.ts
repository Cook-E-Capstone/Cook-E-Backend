import express from 'express';
import { Request, Response, Router } from 'express';
import { checkSchema, validationResult } from 'express-validator';
import { UserRegisterValidator, UserLoginValidator } from '../validators/user';
import { ResponseTemplate } from '../types/response';
import { CreateUser, LoginUser } from '../types/user';
import {
  createUser,
  loginUser,
  getUserByEmail,
  getUserById
} from '../controllers/user';
import { generateAuthToken, verifyAuth } from '../middlewares/auth';
import { convertUserData } from '../utils/converters';
import { RequestTemplate } from '../types/request';

const userRouter = express.Router();

userRouter.post(
  '/register',
  checkSchema(UserRegisterValidator),
  async (req: Request, res: Response) => {
    let response: ResponseTemplate;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      response = {
        status: 400,
        message: 'Bad request',
        errors: errors.array()
      };
      return res.status(400).json(response);
    }

    const { email, name, password } = req.body;
    const userData: CreateUser = {
      email,
      name,
      password
    };
    try {
      const existingUser = await getUserByEmail(userData.email);
      if (existingUser) {
        response = {
          status: 400,
          message: 'Bad request',
          errors: 'User already exists'
        };
        return res.status(400).json(response);
      }
      const newUser = await createUser(userData);
      const token = generateAuthToken(newUser.id);
      response = {
        status: 200,
        message: 'success',
        data: {
          user: convertUserData(newUser),
          token
        }
      };
      res.status(200).json(response);
    } catch (err) {
      response = {
        status: 500,
        message: 'Internal server error',
        errors: err.message
      };
      res.status(500).json(response);
    }
  }
);

userRouter.post(
  '/login',
  checkSchema(UserLoginValidator),
  async (req: Request, res: Response) => {
    let response: ResponseTemplate;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      response = {
        status: 400,
        message: 'Bad request',
        errors: errors.array()
      };
      return res.status(400).json(response);
    }

    const { email, password } = req.body;
    const loginData: LoginUser = {
      email,
      password
    };
    try {
      const user = await loginUser(loginData);

      if (!user) {
        response = {
          status: 401,
          message: 'Unauthorized',
          errors: 'Email or password is incorrect'
        };
        return res.status(401).json(response);
      }

      const token = generateAuthToken(user.id);

      response = {
        status: 200,
        message: 'success',
        data: {
          user: convertUserData(user),
          token
        }
      };
      res.status(200).json(response);
    } catch (err) {
      response = {
        status: 500,
        message: 'Internal server error',
        errors: err.message
      };
      res.status(500).json(response);
    }
  }
);

userRouter.get(
  '/profile',
  verifyAuth,
  async (req: RequestTemplate, res: Response) => {
    let response: ResponseTemplate;

    const { user } = req;

    try {
      const userData = await getUserById(user.userID);

      if (!userData) {
        response = {
          status: 401,
          message: 'Unauthorized',
          errors: 'User not found'
        };
        return res.status(401).json(response);
      }

      response = {
        status: 200,
        message: 'success',
        data: { user: convertUserData(userData) }
      };
      res.status(200).json(response);
    } catch (err) {
      response = {
        status: 500,
        message: 'Internal server error',
        errors: err.message
      };
      res.status(500).json(response);
    }

    return null;
  }
);

export default userRouter;
