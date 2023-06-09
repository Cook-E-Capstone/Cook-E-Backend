import express from 'express';
import { Request, Response, Router } from 'express';
import { checkSchema, validationResult } from 'express-validator';
import {
  CommunityCreateValidator,
  CommunityGetManyValidator
} from '../validators/community';
import { uploadPhoto } from '../middlewares/upload';
import { verifyAuth } from '../middlewares/auth';
import { RequestTemplate } from '../types/request';
import { ResponseTemplate } from '../types/response';
import {
  createCommunity,
  getAllCommunity,
  getCommunityById,
  getCommunityByTitle
} from '../controllers/community';
import { CreateCommunity } from '../types/community';
import { uploadFileToStorage } from '../utils/upload';
import { convertUserData } from '../utils/converters';

const communityRouter = express.Router();

communityRouter.post(
  '',
  verifyAuth,
  uploadPhoto,
  checkSchema(CommunityCreateValidator),
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

    const { user } = req;
    const { photo } = req.files;
    const { title, content } = req.body;

    if (photo.length <= 0) {
      response = {
        status: 400,
        message: 'Bad request',
        errors: 'No file uploaded'
      };
      return res.status(400).json(response);
    }
    const { buffer, originalname, mimetype } = photo[0];
    const filename = 'community/' + Date.now() + '_' + originalname;

    try {
      const fileUrl = await uploadFileToStorage(buffer, filename, mimetype);
      const communityData: CreateCommunity = {
        title: title,
        content: content,
        pathfile: fileUrl,
        userID: user.userID
      };
      const newCommunity = await createCommunity(communityData);
      response = {
        status: 200,
        message: 'success',
        data: { community: newCommunity }
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

communityRouter.get(
  '',
  verifyAuth,
  checkSchema(CommunityGetManyValidator),
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
    const { title } = req.query;

    try {
      let communities = [];
      if (title) {
        communities = await getCommunityByTitle(title as string);
      } else {
        communities = await getAllCommunity();
      }
      response = {
        status: 200,
        message: 'success',
        data: { community: communities }
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

communityRouter.get('/:id', verifyAuth, async (req: Request, res: Response) => {
  let response: ResponseTemplate;

  const { id } = req.params;

  try {
    const community = await getCommunityById(id);

    if (!community) {
      response = {
        status: 404,
        message: 'Not found',
        errors: 'Community not found'
      };
      return res.status(404).json(response);
    }

    response = {
      status: 200,
      message: 'success',
      data: {
        community: { ...community, user: convertUserData(community.user) }
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
});

export default communityRouter;
