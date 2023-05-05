const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4, stringify } = require("uuid");
const { getDb } = require("../db/db");
const {
  validateRegister,
  validateLogin,
  validateDeleteUser,
} = require("../utilities/joi-validators");
const generateToken = require("../utilities/generateToken");
const {
  getUserByEmail,
  getUserById,
  getAllUsers,
  createUser,
  createAdminUser,
  checkIfUserExists,
  removeUser,
} = require("../services/userService");
const { deleteAllUserLedgers } = require("../services/ledgerService");

//TODO: add update user functionality

// @desc    register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { error } = validateRegister(req.body);
    if (error) {
      console.log("Validation error:", error.details[0].message);
      res.status(400).json({ message: error.details[0].message });
    }
    const { name, email, password } = req.body;

    if (await checkIfUserExists({ email })) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await createUser({ name, email, password });

    res.status(201).json(user);
  } catch (err) {
    console.error("ERROR: ", err);
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
});

// @desc    register new user
// @route   POST /api/users
// @access  Public
const registerAdminUser = asyncHandler(async (req, res) => {
  try {
    const { error } = validateRegister(req.body);
    if (error) {
      console.log("Validation error:", error.details[0].message);
      res.status(400).json({ message: error.details[0].message });
    }
    const { name, email, password } = req.body;

    if (await checkIfUserExists({ email })) {
      res.status(400).json({ message: "User already exists" });
    }

    const user = await createAdminUser({ name, email, password });
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
    const users = await getAllUsers();

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
    res.status(400).json({ message: error.details[0].message });
  }

  const { email, password } = req.body;

  //get user object from database
  const user = await getUserByEmail({ email });

  //compare user's password to input password
  if (user && (await bcrypt.compare(password, user.password))) {
    //returns the token if true

    console.log("user logged in");
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    return res.status(400).json({ message: "Invalid credentials" });
  }
});

// @desc    Delete user
// @route   DELETE /api/login/:id
// @access  Private
const deleteUser = asyncHandler(async (req, res) => {
  const { error } = validateDeleteUser(req.body);
  if (error) {
    console.log("Validation error:", error.details[0].message);
    res.status(400);
    res.status(400).json({ message: error.details[0].message });
  }

  const { id } = req.body;

  try {
    //get user object from database
    const user = await getUserById({ id });

    if (user) {
      // delete all ledgers belonging to the user
      const deleteLedgers = await deleteAllUserLedgers(id);
      const user = await removeUser(id);
      console.log(`User deleted: ${id}`);

      res.status(201).json(JSON.stringify(`User deleted: ${id}`));
    } else {
      res.status(400).json(JSON.stringify("No user found with matching ID"));
    }
  } catch (err) {
    console.error("ERROR: ", err);
    return res.status(400).json({ message: "User has not been deleted" });
  }
});

module.exports = {
  registerUser,
  getUsers,
  loginUser,
  deleteUser,
  registerAdminUser,
};
