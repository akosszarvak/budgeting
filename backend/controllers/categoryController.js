const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4, stringify } = require("uuid");
const { getDb } = require("../db/db");

// @desc    get categories
// @route   GET /api/categories
// @access  private
const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await getDb().any("SELECT id, name FROM categories");
    res.status(201).json(JSON.stringify(categories));
  } catch (error) {
    console.error("ERROR: ", error);

    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
});

// @desc    add new category
// @route   POST /api/categories
// @access  private
const addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const id = uuidv4();
  const { user_id } = req.user.id;

  if (!name) {
    res.status(400);
    throw new Error("please add all required fields!");
  }
  try {
    const ledger = await getDb().any(
      "INSERT INTO categories (id, name) VALUES ($1, $2)",
      [id, name]
    );
    console.log(`Category created: `, name);

    res.status(201).json(name);
  } catch (err) {
    console.error("ERROR: ", err);
    throw new Error("Invalid values");
  }
});

// @desc    add new category
// @route   POST /api/categories
// @access  private
const addUserCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const id = uuidv4();
  const { user_id } = req.user.id;

  if (!name) {
    res.status(400);
    throw new Error("please add all required fields!");
  }
  try {
    const ledger = await getDb().any(
      "INSERT INTO categories (id, name, user_id) VALUES ($1, $2, $3)",
      [id, name, user_id]
    );
    console.log(`Category created: `, name);

    res.status(201).json(name);
  } catch (err) {
    console.error("ERROR: ", err);
    throw new Error("Invalid values");
  }
});

// @desc    delete ledger
// @route   DELETE /api/ledgers
// @access  private
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const user_id = req.user.id;
  console.log("getting to the delete ledger function");

  try {
    const user = await getDb().query(
      "DELETE FROM categories WHERE id = $1 AND user_id = $2",
      [id, user_id]
    );

    console.log(`Ledger deleted: ${id}`);

    res.status(201).json(JSON.stringify(`Ledger deleted: ${id}`));
  } catch (err) {
    console.error("ERROR: ", err);
    throw new Error("Invalid credentials");
  }
});

module.exports = {
  getCategories,
  addCategory,
  addUserCategory,
  deleteCategory,
};
