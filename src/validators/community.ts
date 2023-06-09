import { Schema } from 'express-validator';

export const CommunityCreateValidator: Schema = {
  title: {
    in: ['body'],
    isString: true
  },
  content: {
    in: ['body'],
    isString: true
  },
  photo: {
    in: ['body']
  }
};

export const CommunityGetManyValidator: Schema = {
  title: {
    in: ['query'],
    isString: true,
    optional: true
  }
};
