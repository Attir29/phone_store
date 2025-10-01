import { pool } from "../config/db.js";

export const getAllUsersHandler = async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT id, fullname, username, email, role, address, phone_number, age, created_at, updated_at FROM users"
    );

    res.status(200).json({
      status: "success",
      data: users,
      message: "Get all users succesfully",
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUsersByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const [users] = await pool.query(
      "SELECT id, fullname, username, email, role, address, phone_number, age FROM users WHERE id = ?",
      [id]
    );

    if (users.length === 0) {
      res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Get user by id succesfully",
      data: users[0],
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addUserHandler = async (req, res) => {
  const { fullname, username, email, password, role } = req.body;

  if (!fullname || !fullname.trim) {
    return res.status(400).json({
      status: "fail",
      message: "Fullname is required",
    });
  }

  if (!username || !username.trim) {
    return res.status(400).json({
      status: "fail",
      message: "username is required",
    });
  }

  if (!email || !email.trim) {
    return res.status(400).json({
      status: "fail",
      message: "email is required",
    });
  }

  if (!password || !password.trim) {
    return res.status(400).json({
      status: "fail",
      message: "password is required",
    });
  }

  if (!role || !role.trim) {
    return res.status(400).json({
      status: "fail",
      message: "role is required",
    });
  }

  try {
    const [users] = await pool.query(
      "INSERT INTO users (fullname, username, email, password, role) VALUES (?,?,?,?,?)",
      [fullname, username, email, password, role]
    );

    const newUser = {
      id: users.insertId,
      fullname,
      username,
      email,
      role,
      address,
      phone_number,
      age,
      created_at,
      updated_at,
    };

    res.status(201).json({
      status: "success",
      message: "user created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateUserHandler = async (req, res) => {
  const { id } = req.params;
  const {
    fullname,
    username,
    email,
    password,
    role,
    address,
    phone_nunber,
    age,
  } = req.body;

  try {
    const [users] = await pool.query(
      "UPDATE users SET fullname=?, username=?, email=?, password=?, role=?, address=?, phone_number=?, age=? WHERE id=?",
      [
        fullname,
        username,
        email,
        password,
        role,
        address,
        phone_nunber,
        age,
        id,
      ]
    );

    const upadateUser = {
      id,
      fullname,
      username,
      email,
      role,
      address,
      phone_nunber,
      age,
    };

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: upadateUser,
    });
  } catch (error) {
    console.error(error);
  }
};
