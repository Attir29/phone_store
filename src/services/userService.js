import { pool } from "../config/db.js";
import { ResponseError } from "../errors/responseError.js";

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
  const {
    fullname,
    username,
    email,
    password,
    role,
    address,
    phone_number,
    age,
  } = request;

  const [users] = await pool.query(
    "INSERT INTO users (fullname, username, email, password, role, address, phone_number, age) VALUES (?,?,?,?,?,?,?,?)",
    [fullname, username, email, password, role, address, phone_number, age]
  );

  const newUser = {
    id: users.insertId,
    fullname,
    username,
    email,
    role,
  };

  return newUser
};

export const deleteUser = async (id) => {
  const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "user not found");
  }
}; 

export const updateUser = async (id, request) => {
  const {
    fullname,
    username,
    email,
    role,
    address,
    phone_number,
    age,
  } = request;

  const [result] = await pool.query(
    "UPDATE users SET fullname = ?, username = ?, email = ?, role = ?, address = ?, phone_number = ?, age = ? WHERE id = ?",
    [fullname, username, email, role, address, phone_number, age, id]
  );

  if (result.affectedRows === 0) {
    throw new ResponseError(404, "user not found");
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
