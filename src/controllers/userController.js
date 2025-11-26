import * as UserService from "../services/userService.js";

export const getAllUserHandler = async (req, res, next) => {
  try {
    const response = await UserService.getAllUser();

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserByIdHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await UserService.getUserById(id);

    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const createUserHandler = async (req, res, next) => {
  try {
    const response = await UserService.createUser(req.body);

    console.log(response);
    res.status(201).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    await UserService.deleteUser(id);
    res.status(204).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateUserHandler = async (req, res, next) => {
  try {
    const { id } = req.params;
    const response = await UserService.updateUser(id, req.body);
    res.status(200).json({
      status: "success",
      data: response,
    });
  } catch (error) {
    next(error);
  }
};
