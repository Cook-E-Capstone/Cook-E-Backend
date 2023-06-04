import { PrismaClient } from "@prisma/client";

import fs from "fs";

import path from "path";

type CommunityData = {
  tittle: string;
  content: string;
  pathfile: string;
};

const prisma = new PrismaClient();

export const postComunity = async (req, res) => {
  try {
    const { tittle, content} = req.body;

  // Validasi data
//   if (!tittle || !content ) {
//     return res.status(400).json({
//       status: 400,
//       message: "Invalid data. Please provide tittle, content",
//     });
//   }

  if(req.file){

    //console.log(req.file,"req.file")

    let tmp_path= req.file.path;
    let originaExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
    let filename = req.file.filename + '.' + originaExt;
    let target_path = path.resolve(path.resolve(__dirname, '..'), `uploads/${filename}`)

    const src = fs.createReadStream(tmp_path)
    const dest = fs.createWriteStream(target_path)

    src.pipe(dest)
    console.log(target_path,"target_path")
    src.on('end', async () => {

        const communityData: CommunityData = {
            tittle,
            content,
            pathfile: target_path,
          };
        
          const create = await prisma.community.create({
            data: communityData,
          });
        
          const result = {
            status: 200,
            message: "success",
            data: create,
          };
        
          res.json(result);
          //console.log(result,"result")


    })

    

  }
    
  } catch (error) {
    res.status(500).json({
        status: 500,
        message: error.message || "Internal Server Error",
    })
    
  }
};
