import cors from "cors";
import express from "express";
import { testConnection } from "./config/db.js";
import userRouter from "./routes/userRoute.js";

const app = express();

app.use(cors());

app.use(express.json());

const port = 3000;

app.use(userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  testConnection();
});
