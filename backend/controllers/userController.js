const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4, stringify } = require("uuid");
const { getDb } = require("../db/db");
const {
  validateRegister,
  validateLogin,
  validateDeleteUser,
} = require("../utilities/joi-validators");

//TODO: add update user functionality

// @desc    register new user
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { error } = validateRegister(req.body);
  if (error) {
    console.log("Validation error:", error.details[0].message);
    res.status(400);
    throw new Error(error.details[0].message);
  }
  const { name, email, password } = req.body;

  const id = uuidv4();

  if (!name || !email || !password) {
    res.status(400);
    throw new Error(
      "Please provide all required fields: ",
      name,
      email,
      password
    );
  }

  const userExists = await getDb().query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  if (userExists.length !== 0) {
    res.status(400);
    throw new Error("User already exists");
  }

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
      token: generateToken(id),
    };

    res.status(201).json(user);
  } catch (err) {
    console.error("ERROR: ", err);

    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
});

// @desc   Get users data
// @route   GET /api/users
// @access  Private
const getUsers = asyncHandler(async (req, res) => {
  try {
    const users = await getDb().any("SELECT id, name, email FROM users");

    res.status(201).json(JSON.stringify(users));
  } catch (error) {
    console.error("ERROR: ", error);

    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
});

// @desc    Authenticate user
// @route   POST /api/login
// @access  Public
const loginUser = asyncHandler(async (req, res, next) => {
  const { error } = validateLogin(req.body);
  if (error) {
    console.log("Validation error:", error.details[0].message);
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const { email, password } = req.body;

  // //check for user email
  const [user] = await getDb().query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  //compare user's password
  if (user && (await bcrypt.compare(password, user.password))) {
    //returns the token if true

    console.log("user logged in");
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Delete user
// @route   DELETE /api/login/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const { error } = validateDeleteUser(req.body);
  if (error) {
    console.log("Validation error:", error.details[0].message);
    res.status(400);
    throw new Error(error.details[0].message);
  }

  try {
    const getUser = await getDb().query(
      "SELECT * FROM users WHERE id = $1",
      id
    );

    console.log(getUser);
    if (getUser) {
      const deleteLedgers = await getDb().query(
        "DELETE FROM ledgers WHERE user_id = $1",
        [id]
      );
      const user = await getDb().query("DELETE FROM users WHERE id = $1", [id]);
    }

    console.log(`User deleted: ${id}`);

    res.status(201).json(JSON.stringify(`User deleted: ${id}`));
  } catch (err) {
    console.error("ERROR: ", err);
    throw new Error("Invalid credentials");
  }
});

// generate JWT
const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, getUsers, loginUser, deleteUser };
