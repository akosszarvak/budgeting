const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { v4: uuidv4, stringify } = require("uuid");
const { getDb } = require("../db/db");
const { updateBalance } = require("../utilities/updateBalance");

// @desc    get user's ledgers
// @route   GET /api/ledgers
// @access  private
const getLedgers = asyncHandler(async (req, res) => {
  const user_id = req.user.id;
  console.log("user_id", user_id);
  try {
    const ledgers = await getDb().any(
      "SELECT id, trans_type, name, amount FROM ledgers WHERE user_id = $1",
      [user_id]
    );
    // console.log(ledgers);
    res.status(201).json(JSON.stringify(ledgers));
  } catch (error) {
    console.error("ERROR: ", error);

    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
});

// @desc    add new ledger
// @route   POST /api/ledgers
// @access  private
const addLedger = asyncHandler(async (req, res) => {
  const { category_id, trans_type, name, amount } = req.body;
  const note = req.body.note ? req.body.note : "";
  const id = uuidv4();
  const user_id = req.user.id;
  console.log(req.user.id);
  console.log(user_id);

  if (!category_id || !trans_type || !amount || !name) {
    res.status(400);
    throw new Error("please add all required fields!");
  }

  try {
    const ledger = await getDb().any(
      "INSERT INTO ledgers (id, user_id, category_id, trans_type, name, amount, note) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [id, user_id, category_id, trans_type, name, amount, note]
    );
    console.log(`Transaction created:`, ledger);

    res.status(201).json(JSON.stringify(ledger));
  } catch (err) {
    console.error("ERROR: ", err);
    throw new Error("Invalid values");
  }
});

// @desc    update ledger
// @route   POST /api/ledgers
// @access  private
const updateLedger = asyncHandler(async (req, res) => {});

// @desc    delete ledger
// @route   DELETE /api/ledgers
// @access  private
const deleteLedger = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const user_id = req.user.id;

  try {
    const user = await getDb().query(
      "DELETE FROM ledgers WHERE id = $1 AND user_id = $2",
      [id, user_id]
    );

    console.log(`Ledger deleted: ${id}`);

    res.status(201).json(JSON.stringify(`Ledger deleted: ${id}`));
  } catch (err) {
    console.error("ERROR: ", err);
    throw new Error("Invalid credentials");
  }
});

module.exports = { getLedgers, addLedger, updateLedger, deleteLedger };
