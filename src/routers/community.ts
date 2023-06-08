import express from 'express';
import { Request, Response, Router } from 'express';
import { postComunity } from '../controllers/community';
import multer = require('multer');
import os = require('os');

const router = express.Router();

router.post(
  '/community',
  multer({ dest: os.tmpdir() }).single('file'),
  postComunity
);

export default router;
