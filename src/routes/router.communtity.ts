import express from "express";
import { postComunity } from './../controllers/controller.comunity';
const  router = express.Router();
import multer =require('multer') 
import os=require('os')
router.post("/comunity",  multer({ dest: os.tmpdir() }).single('file'), postComunity);

export default router;