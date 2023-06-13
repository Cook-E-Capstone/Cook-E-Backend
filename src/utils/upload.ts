import dotenv from 'dotenv';
import { Storage } from '@google-cloud/storage';
import { File } from 'multer';

dotenv.config();
const projectId = process.env.PROJECT_ID || '';
const gcpBucketName = 'cooke_storage';
const serviceAccount = process.env.GCP_SA_KEY || '';

const storage = new Storage({
  projectId: projectId,
  credentials: JSON.parse(serviceAccount)
});

export const uploadFileToStorage = async (
  fileBuffer: Buffer,
  fileName: string,
  fileType: string
): Promise<string> => {
  const bucketName = gcpBucketName;
  const bucket = storage.bucket(bucketName);
  const fileUpload = bucket.file(fileName);

  await fileUpload.createResumableUpload();

  await fileUpload.save(fileBuffer, {
    resumable: true,
    validation: false,
    preconditionOpts: { ifGenerationMatch: 0 }
  });

  await fileUpload.setMetadata({
    contentDisposition: `inline; filename*=utf-8''"${encodeURIComponent(
      fileName
    )}"`,
    contentType: fileType
  });

  const fileUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
  return fileUrl;
};
