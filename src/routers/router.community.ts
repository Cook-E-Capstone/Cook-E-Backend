import express from 'express';
import { Request, Response, Router } from 'express';
import { postComunity } from '../controllers/controller.community';
import multer = require('multer');
import os = require('os');

const router = express.Router();

router.post(
  '/comunity',
  multer({ dest: os.tmpdir() }).single('file'),
  postComunity
);

export default router;
