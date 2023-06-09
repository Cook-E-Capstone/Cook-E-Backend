import { NextFunction, Request, Response } from 'express';
import multer, { File } from 'multer';
import { ResponseTemplate } from '../types/response';
import { RequestTemplate } from '../types/request';

const fileFilter = (
  _req: Request,
  file: File,
  cb: multer.FileFilterCallback
) => {
  if (
    file.fieldname === 'photo' &&
    file.mimetype !== 'image/jpeg' &&
    file.mimetype !== 'image/png'
  ) {
    cb(
      new Error(
        'Photo file type not allowed. Please use jpg, jpeg, or png file'
      ),
      false
    );
  }
  cb(null, true);
};

const multerStorage = multer.memoryStorage();
const upload = multer({
  storage: multerStorage,
  fileFilter: fileFilter
});

export const uploadPhoto = (
  req: RequestTemplate,
  res: Response,
  next: NextFunction
) => {
  let response: ResponseTemplate;
  const uploader = upload.fields([{ name: 'photo', maxCount: 1 }]);

  uploader(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      response = { status: 400, message: 'Bad request', errors: err.message };
      res.status(400).json(response);
    } else if (err instanceof Error) {
      response = { status: 400, message: 'Bad request', errors: err.message };
      res.status(400).json(response);
    } else if (err) {
      response = {
        status: 500,
        message: 'Internal server error',
        errors: JSON.stringify(err)
      };
      res.status(500).json(response);
    } else {
      next();
    }
  });
};
