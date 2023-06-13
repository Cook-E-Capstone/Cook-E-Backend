import { Schema } from 'express-validator';

export const MachineLearningImageValidator: Schema = {
  photo: {
    in: ['body']
  }
};

export const MachineLearningRecipeValidator: Schema = {
  query: {
    in: ['query'],
    isString: true
  },
  limit: {
    in: ['query'],
    isNumeric: true,
    optional: true
  }
};
