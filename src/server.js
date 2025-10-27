import cors from "cors";
import express from "express";
import { testConnection } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import { errorMiddleware } from "./middlewares/middlewares.js";

const app = express();
app.use(express.json());
app.use(cors());



const port = 3000;

app.use(userRouter);

app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  testConnection();
});
