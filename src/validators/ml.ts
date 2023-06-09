import { Schema } from 'express-validator';

export const MachineLearningImageValidator: Schema = {
  photo: {
    in: ['body']
  }
};
