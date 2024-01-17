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
