import express from "express";
import dotenv from "dotenv";
import { router } from "./routes";
dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
