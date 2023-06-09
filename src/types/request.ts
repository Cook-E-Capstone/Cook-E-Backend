import { Request } from 'express';
import { File } from 'multer';

export interface RequestTemplate extends Request {
  user?: Token;
  files?: FileTemplate;
  filePath?: string;
}

export interface FileTemplate {
  photo?: File[];
}

export interface Token {
  userID: string;
  iat: number;
  exp: number;
}
