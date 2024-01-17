import multer from "multer";
import { Storage } from "@google-cloud/storage";
import dotenv from "dotenv";
dotenv.config();

export const upload = multer({ storage: multer.memoryStorage() });

const storage = new Storage({
  projectId: process.env.CLOUD_PROJECT_ID,
  credentials: {
    type: "service_account",
    project_id: process.env.CLOUD_PROJECT_ID,
    private_key_id: process.env.CLOUD_PRIVATE_KEY_ID,
    private_key: process.env.CLOUD_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.CLOUD_CLIENT_EMAIL,
    client_id: process.env.CLOUD_CLIENT_ID,
    auth_uri: process.env.CLOUD_AUTH_URI,
    token_uri: process.env.CLOUD_TOKEN_URI,
    auth_provider_x509_cert_url: process.env.CLOUD_AUTH_PROVIDER,
    client_x509_cert_url: process.env.CLOUD_CERT_URL,
  } as any,
});

export const bucket = storage.bucket(process.env.CLOUD_BUCKET as string);

export const uploadFile = (file: Express.Multer.File): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!file || !file.buffer) {
      reject("File or file buffer is empty");
      return;
    }

    const blob = bucket.file(file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on("error", reject);

    blobStream.on("finish", () => {
      resolve();
    });

    blobStream.end(file.buffer);
  });
};

export const getFileURL = async (fileName: string): Promise<string> => {
  const options = {
    version: "v4" as any,
    action: "read" as any,
    expires: Date.now() + 15 * 60 * 1000, // URL is valid for 15 minutes
  };
  const [url] = await bucket.file(fileName).getSignedUrl(options);
  return url;
};
