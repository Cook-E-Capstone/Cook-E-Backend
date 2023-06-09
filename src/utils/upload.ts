import dotenv from 'dotenv';
import { Storage } from '@google-cloud/storage';
import { File } from 'multer';

dotenv.config();
const projectId = process.env.PROJECT_ID || '';
const gcpBucketName = 'cooke_storage';
const serviceAccount = 'gcp_service_account.json';

const storage = new Storage({
  projectId: projectId,
  keyFilename: serviceAccount
});

export const uploadFileToStorage = async (
  fileBuffer: Buffer,
  fileName: string,
  fileType: string
): Promise<string> => {
  const bucketName = gcpBucketName;
  const bucket = storage.bucket(bucketName);
  const fileUpload = bucket.file(fileName);

  return new Promise((resolve, reject) => {
    const stream = fileUpload.createWriteStream({
      resumable: false,
      metadata: {
        contentType: fileType
      }
    });

    stream.on('error', (error) => {
      reject(error);
    });

    stream.on('finish', () => {
      const fileUrl = `https://storage.googleapis.com/${bucketName}/${fileName}`;
      resolve(fileUrl);
    });

    stream.end(fileBuffer);
  });
};
