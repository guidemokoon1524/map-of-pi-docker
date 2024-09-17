import multer from "multer";
import multerS3 from "multer-s3";
import { S3 } from "@aws-sdk/client-s3";

import path from "path";

import { env } from "./env";

// Set S3 endpoint to DigitalOcean Spaces
const s3 = new S3({
  forcePathStyle: false, // Configures to use subdomain/virtual calling format.
  endpoint: `${env.DIGITAL_OCEAN_REGION}.digitaloceanspaces.com`,
  region: "us-east-1",
  credentials: {
    accessKeyId: env.DIGITAL_OCEAN_SPACES_KEY_ID,
    secretAccessKey: env.DIGITAL_OCEAN_SPACES_SECRET_ACCESS_KEY
  }
});

const storage = multerS3({
  s3,
  bucket: env.IMAGES_BUCKET_NAME,
  acl: 'public-read',
  key: function (request: any, file: any, callback: any) {
    callback(null, file.originalname);
  }
});

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
): void => {
  const extension = path.extname(file.originalname).toLowerCase();
  if (!(extension === ".jpg" || extension === ".jpeg" || extension === ".png")) {
    const error: any = {
      code: "INVALID_FILE_TYPE",
      message: "Wrong format for file",
    };
    cb(new Error(error.message));
    return;
  }
  cb(null, true);
};

const upload = multer({
  storage,
  fileFilter
});

export default upload;
