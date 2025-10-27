import { pool } from "../config/db.js";

export const getAllUsersHandler = async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT id, fullname, username, email, role, address, phone_number, age, created_at, updated_at FROM users"
    );

    res.status(200).json({
      status: "success",
      data: users,
      message: "Get all users successfully",
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
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Get user by id successfully",
      data: users[0],
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addUsersHandler = async (req, res) => {
  const {
    fullname,
    username,
    email,
    password,
    role,
    address,
    phone_number,
    age,
  } = req.body;

  if (!fullname || !fullname.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "Fullname is required",
    });
  }

  if (!username || !username.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "Username is required",
    });
  }

  if (!email || !email.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "Email is required",
    });
  }

  if (!password || !password.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "Password is required",
    });
  }

  if (!role || !role.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "Role is required",
    });
  }

  if (!address || !address.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "Address is required",
    });
  }

  if (!phone_number || !phone_number.trim()) {
    return res.status(400).json({
      status: "fail",
      message: "Phone number is required",
    });
  }

  if (!age || !age.toString().trim()) {
    return res.status(400).json({
      status: "fail",
      message: "Age is required",
    });
  }

  try {
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

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateUsersHandler = async (req, res) => {
  const { id } = req.params;
  const {
    fullname,
    username,
    email,
    password,
    role,
    address,
    phone_number,
    age,
  } = req.body;

  try {
    await pool.query(
      "UPDATE users SET fullname=?, username=?, email=?, password=?, role=?, address=?, phone_number=?, age=? WHERE id=?",
      [
        fullname,
        username,
        email,
        password,
        role,
        address,
        phone_number,
        age,
        id,
      ]
    );

    const [userUpdate] = await pool.query(
      "SELECT id, fullname, username, email, role, address, phone_number, age FROM users WHERE id = ?",
      [id]
    );

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: userUpdate[0],
    });
  } catch (error) {
    console.error(error);
  }
};

// ✅ Tambahan: Delete Handler
export const deleteUsersHandler = async (req, res) => {
  const { id } = req.params;

  try {
    const [existingUser] = await pool.query(
      "SELECT id FROM users WHERE id = ?",
      [id]
    );

    if (existingUser.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    await pool.query("DELETE FROM users WHERE id = ?", [id]);

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
