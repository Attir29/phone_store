import express from "express";
import {
  addUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  getUsersByIdHandler,
  updateUserHandler,
} from "../handlers/userhandler.js";

const userRouter = express.Router();

userRouter.get("/users", getAllUsersHandler);
userRouter.get("/users/:id", getUsersByIdHandler);
userRouter.post("/users", addUserHandler);
userRouter.put("/users/:id", updateUserHandler);
userRouter.delete("/users/:id", deleteUserHandler);

export default userRouter;
