const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const { getDb } = require("../db/db");
const generateToken = require("../utilities/generateToken");

const getUserByEmail = asyncHandler(async ({ email }) => {
  try {
    // check for user email and get user object
    const [user] = await getDb().query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    return user;
  } catch (err) {
    console.error("ERROR: ", err);

    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
});

const getUserById = asyncHandler(async ({ id }) => {
  try {
    // check for user id and get user object
    const [user] = await getDb().query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);

    return user;
  } catch (err) {
    console.error("ERROR: ", err);

    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
});

const createUser = asyncHandler(async ({ name, email, password }) => {
  const id = uuidv4();
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const userResult = await getDb().query(
      "INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4)",
      [id, name, email, hashedPassword]
    );

    console.log(`User created: `, email, name);

    const user = {
      _id: id,
      name: name,
      email: email,
      role: "user",
      token: generateToken(id),
    };

    return user;
  } catch (err) {
    console.error("ERROR: ", err);

    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
});

const createAdminUser = async ({ name, email, password }) => {
  const id = uuidv4();

  const role = "admin";
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const userResult = await getDb().query(
      "INSERT INTO users (id, name, email, password, role) VALUES ($1, $2, $3, $4, $5)",
      [id, name, email, hashedPassword, role]
    );

    console.log(`Admin created: `, email, name);

    const user = {
      _id: id,
      name: name,
      email: email,
      role: role,
      token: generateToken(id),
    };
    return user;
  } catch (err) {
    console.error("ERROR: ", err);

    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};

const checkIfUserExists = async ({ email }) => {
  try {
    const userExists = await getDb().query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.length !== 0) {
      console.log("user already exists: " + userExists);
      return true;
    } else return false;
  } catch (err) {
    console.error("ERROR: ", err);

    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};

const removeUser = async ({ id }) => {
  try {
    const user = await getDb().query("DELETE FROM users WHERE id = $1", [id]);

    console.log("user", user);
    return true;
  } catch (err) {
    console.error("ERROR: ", err);

    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};

const getAllUsers = async () => {
  try {
    const users = await getDb().any(
      "SELECT id, name, email, role, created_at FROM users"
    );

    return users;
  } catch (err) {
    console.error("ERROR: ", err);

    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};
module.exports = {
  getUserByEmail,
  getUserById,
  getAllUsers,
  createUser,
  createAdminUser,
  checkIfUserExists,
  removeUser,
};
