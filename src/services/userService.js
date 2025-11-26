import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";
import {
  createUserSchema,
  updateUserSchema,
} from "../validations/userValidation.js";
import validate from "../validations/validate.js";
import bcrypt from "bcrypt";

export const getAllUser = async () => {
  const [users] = await pool.query(
    "SELECT id, fullname, username, email, role, address, phone_number, age, created_at, updated_at FROM users"
  );

  return users;
};

export const getUserById = async (id) => {
  const [users] = await pool.query(
    "SELECT id, fullname, username, email, role, address, phone_number, age FROM users WHERE id = ?",
    [id]
  );

  if (users.length === 0) {
    throw new ResponseError(404, "user not found");
  }

  return users[0];
};

export const createUser = async (request) => {
  const validated = validate(createUserSchema, request);

  const {
    fullname,
    username,
    email,
    password,
    role,
    address,
    phone_number,
    age,
  } = validated;

  const hashedPassword = await bcrypt.hash(password, 10);

  const [users] = await pool.query(
    "INSERT INTO users (fullname, username, email, password, role, address, phone_number, age) VALUES (?,?,?,?,?,?,?,?)",
    [
      fullname,
      username,
      email,
      hashedPassword,
      role,
      address,
      phone_number,
      age,
    ]
  );

  const newUser = {
    id: users.insertId,
    fullname,
    username,
    email,
    role,
  };

  return newUser;
};

export const deleteUser = async (id) => {
  const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "user not found");
  }
};

export const updateUser = async (id, request) => {
  // ✅ VALIDASI MENGGUNAKAN updateUserSchema
  const validated = validate(updateUserSchema, request);

  // ✅ CEK APAKAH USER ADA
  const [existing] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  if (existing.length === 0) {
    throw new ResponseError(404, "user not found");
  }

  // ✅ Gabungkan data lama + data baru (hanya update field yang dikirim)
  const updatedData = {
    ...existing[0],
    ...validated,
  };

  const {
    fullname,
    username,
    email,
    password,
    role,
    address,
    phone_number,
    age,
  } = updatedData;

  const hashedPassword = await bcrypt.hash(password, 10);

  // ✅ Jalankan query UPDATE
  const [result] = await pool.query(
    "UPDATE users SET fullname = ?, username = ?, email = ?, password = ?, role = ?, address = ?, phone_number = ?, age = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
    [
      fullname,
      username,
      email,
      hashedPassword,
      role,
      address,
      phone_number,
      age,
      id,
    ]
  );

  if (result.affectedRows === 0) {
    throw new ResponseError(400, "failed to update user");
  }

  return {
    id,
    fullname,
    username,
    email,
    role,
    address,
    phone_number,
    age,
  };
};
