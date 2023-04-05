const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const { getDb } = require("../db/db");
const {
  validateAddLedger,
  validateDeleteLedger,
  validateGetLastLedgers,
  validateGetLedgersBetween,
} = require("../utilities/joi-validators");

// @desc    get user's ledgers
// @route   GET /api/ledgers
// @access  private
const getLedgers = asyncHandler(async (req, res) => {
  const user_id = req.user.id;

  try {
    const ledgers = await getDb().any(
      "SELECT l.id, l.trans_type, l.name, l.amount, l.created_at, l.note, c.name AS category FROM ledgers l INNER JOIN categories c ON l.category_id = c.id WHERE l.user_id = $1",
      [user_id]
    );

    res.status(201).json(JSON.stringify(ledgers));
  } catch (error) {
    console.error("ERROR: ", error);

    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
});

// @desc    get user's last x ledgers
// @route   GET /api/ledgers/last
// @access  private
const getLastLedgers = async (req, res) => {
  const { error } = validateGetLastLedgers(req.body);
  if (error) {
    console.log("Validation error: ", error.details[0].message);
    res.status(400);
    throw new Error(error.details[0].message);
  }
  const user_id = req.user.id;
  const { limit } = req.body;

  try {
    const lastLedgers = await getDb().any(
      "SELECT l.id, l.trans_type, l.name, l.amount, l.created_at, l.note, c.name AS category FROM ledgers l INNER JOIN categories c ON l.category_id = c.id WHERE l.user_id = $1 ORDER BY l.created_at DESC LIMIT $2",
      [user_id, limit]
    );
    res.status(201).json(JSON.stringify(lastLedgers));
  } catch (error) {
    console.error("ERROR: ", error);

    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};

// @desc    get user's ledgers between two dates
// @route   GET /api/ledgers/last
// @access  private
const getLedgersBetween = async (req, res) => {
  const { error } = validateGetLedgersBetween(req.body);
  if (error) {
    console.log("Validation error: ", error.details[0].message);
    res.status(400);
    throw new Error(error.details[0].message);
  }
  const user_id = req.user.id;
  const { start, end } = req.body;

  try {
    const lastLedgers = await getDb().any(
      "SELECT l.id, l.trans_type, l.name, l.amount, l.created_at, l.note, c.name AS category FROM ledgers l INNER JOIN categories c ON l.category_id = c.id WHERE l.user_id = $1 AND l.created_at BETWEEN $2 AND $3 ORDER BY l.created_at DESC",
      [user_id, start, end]
    );
    res.status(201).json(JSON.stringify(lastLedgers));
  } catch (error) {
    console.error("ERROR: ", error);

    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};

// @desc    get user's balance
// @route   GET /api/ledgers
// @access  private
const getBalance = asyncHandler(async (req, res) => {
  const user_id = req.user.id;
  console.log("user_id", user_id);
  try {
    const ledgers = await getDb().any(
      "SELECT SUM(CASE WHEN trans_type = 'INC' THEN amount ELSE 0 END) AS INCOME, SUM(CASE WHEN trans_type = 'EXP' THEN amount ELSE 0 END) AS EXPENSE FROM ledgers WHERE user_id = $1",
      [user_id]
    );

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
  const { error } = validateAddLedger(req.body);
  if (error) {
    console.log("Validation error: ", error.details[0].message);
    res.status(400);
    throw new Error(error.details[0].message);
  }

  const { category_id, trans_type, name, amount } = req.body;
  const note = req.body.note ? req.body.note : "";
  const id = uuidv4();
  const user_id = req.user.id;

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
  const { error } = validateDeleteLedger(req.body);
  if (error) {
    console.log("Validation error: ", error.details[0].message);
    res.status(400);
    throw new Error(error.details[0].message);
  }
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

module.exports = {
  getLedgers,
  addLedger,
  updateLedger,
  deleteLedger,
  getBalance,
  getLastLedgers,
  getLedgersBetween,
};
