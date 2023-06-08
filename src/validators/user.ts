import { Schema } from 'express-validator';

export const UserRegisterValidator: Schema = {
  name: {
    in: ['body'],
    isString: true,
    isLength: {
      errorMessage: 'Name should be at least 3 chars long',
      options: { min: 3 }
    },
    isAlpha: {
      errorMessage: 'Name should contain only letters, -, and spaces',
      options: ['en-US', { ignore: " -'" }]
    }
  },
  email: {
    in: ['body'],
    isEmail: true
  },
  password: {
    in: ['body'],
    isString: true,
    isLength: {
      errorMessage: 'Password should be at least 6 characters long',
      options: { min: 6 }
    },
    matches: {
      errorMessage:
        'Password should contain at least one lowercase letter, one uppercase letter, and one numeric digit',
      options: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/
    }
  }
};

export const UserLoginValidator: Schema = {
  email: {
    in: ['body'],
    isEmail: true
  },
  password: {
    in: ['body'],
    isString: true
  }
};
