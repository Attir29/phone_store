import express from "express";
import {
  addUserHandler,
  getAllUsersHandler,
  getUsersByIdHandler,
} from "../handlers/userhandler.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUsersHandler);
userRouter.get("/users/:id", getUsersByIdHandler);
userRouter.post("/users", addUserHandler);

export default userRouter