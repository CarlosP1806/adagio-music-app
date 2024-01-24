import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./routes";
import cookieParser from "cookie-parser";
dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
