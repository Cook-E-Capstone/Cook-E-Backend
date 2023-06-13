import express from 'express';
import { Request, Response, Router } from 'express';
import { checkSchema, validationResult } from 'express-validator';
import {
  MachineLearningImageValidator,
  MachineLearningRecipeValidator
} from '../validators/ml';
import { uploadPhoto } from '../middlewares/upload';
import { verifyAuth } from '../middlewares/auth';
import { RequestTemplate } from '../types/request';
import { ResponseTemplate } from '../types/response';
import {
  ImageRecognitionRequest,
  ImageRecognitionResponse,
  RecipeRecommendationResponse
} from '../types/ml';
import { translateIDtoEN } from '../utils/converters';
import FormData from 'form-data';
import axios from 'axios';

const mlRouter = express.Router();

const ENDPOINT_URL = process.env.ML_URL || '';
const KEY = 'cookiecookwithhealthy';
const NINJAS_API_KEY = process.env.NINJAS_API_KEY || '';

mlRouter.post(
  '/image',
  verifyAuth,
  uploadPhoto,
  checkSchema(MachineLearningImageValidator),
  async (req: RequestTemplate, res: Response) => {
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

    const { photo } = req.files;

    if (!photo || photo.length <= 0) {
      response = {
        status: 400,
        message: 'Bad request',
        errors: 'No file uploaded'
      };
      return res.status(400).json(response);
    }

    const apiReq: ImageRecognitionRequest = {
      image: photo[0].buffer
    };

    try {
      const form = new FormData();
      form.append('image', apiReq.image, {
        filename: photo[0].originalname
      });

      const headers = {
        accept: 'application/json',
        'Content-Type': 'multipart/form-data'
      };
      const mlResponse = await axios({
        method: 'post',
        url: `${ENDPOINT_URL}/recognize?api_key=${KEY}`,
        data: form,
        headers: headers
      });

      const resData: ImageRecognitionResponse = {
        name: mlResponse.data.result.nama,
        confidence: parseFloat(mlResponse.data.confidence),
        nutrition: {
          ...mlResponse.data.result
        }
      };

      const response = {
        status: 200,
        message: 'success',
        data: resData
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

mlRouter.get(
  '/recipe',
  verifyAuth,
  checkSchema(MachineLearningRecipeValidator),
  async (req: RequestTemplate, res: Response) => {
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

    const { query, limit } = req.query;
    try {
      const headers = {
        accept: 'application/json'
      };
      let mlResponse;
      if (query && limit != null) {
        mlResponse = await axios({
          method: 'post',
          url: `${ENDPOINT_URL}/recommendation?query=${query}&api_key=${KEY}&limit=${limit}`,
          headers: headers
        });
      } else {
        mlResponse = await axios({
          method: 'post',
          url: `${ENDPOINT_URL}/recommendation?query=${query}&api_key=${KEY}`,
          headers: headers
        });
      }

      const resData: RecipeRecommendationResponse = {
        query: query as string,
        results: mlResponse.data.result
      };

      const response = {
        status: 200,
        message: 'success',
        data: resData
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

export default mlRouter;
