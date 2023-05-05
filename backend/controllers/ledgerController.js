const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const { getDb } = require("../db/db");
const {
  idSchema,
  validateAddLedger,
  validateDeleteLedger,
  validateGetLastLedgers,
  validateGetLedgersBetween,
} = require("../utilities/joi-validators");
const { validateUserId } = require("../utilities/validateUserId");
const {
  getUserLedgers,
  getUserLastLedgers,
  getUserLedgersBetween,
  getUserBalance,
  createLedger,
  deleteUserLedger,
} = require("../services/ledgerService");

// @desc    get user's ledgers
// @route   GET /api/ledgers
// @access  private
const getLedgers = asyncHandler(async (req, res) => {
  try {
    validateUserId(req.user.id);

    const user_id = req.user.id;

    const ledgers = await getUserLedgers({ user_id });

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
  try {
    validateUserId(req.user.id);
    const { error } = validateGetLastLedgers(req.body);
    if (error) {
      console.log("Validation error: ", error.details[0].message);
      res.status(400).json({ message: error.details[0].message });
    }
    const user_id = req.user.id;
    const { limit } = req.body;

    const lastLedgers = await getUserLastLedgers({ user_id, limit });
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
  try {
    validateUserId(req.user.id);
    const { error } = validateGetLedgersBetween(req.body);

    if (error) {
      console.log("Validation error: ", error.details[0].message);
      res.status(400).json({ message: error.details[0].message });
    }
    const user_id = req.user.id;
    const { start, end } = req.body;

    const ledgersBetween = await getUserLedgersBetween({ user_id, start, end });
    res.status(201).json(JSON.stringify(ledgersBetween));
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
  try {
    validateUserId(req.user.id);
    const user_id = req.user.id;

    const balance = await getUserBalance({ user_id });

    res.status(201).json(JSON.stringify(balance));
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
  try {
    validateUserId(req.user.id);
    const { error } = validateAddLedger(req.body);
    if (error) {
      console.log("Validation error: ", error.details[0].message);
      res.status(400).json({ message: error.details[0].message });
    }

    const { category_id, trans_type, name, amount } = req.body;
    const note = req.body.note ? req.body.note : "";
    const user_id = req.user.id;

    const ledger = await createLedger({
      user_id,
      category_id,
      trans_type,
      name,
      amount,
      note,
    });
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
  try {
    validateUserId(req.user.id);
    const { error } = validateDeleteLedger(req.body);
    if (error) {
      console.log("Validation error: ", error.details[0].message);
      res.status(400).json({ message: error.details[0].message });
    }
    const { id } = req.body;
    const user_id = req.user.id;

    const ledger = await deleteUserLedger({ id, user_id });

    console.log(`Ledger deleted: ${id}`);

    res.status(201).json(JSON.stringify(`Ledger deleted: ${id}`));
  } catch (err) {
    console.error("ERROR: ", error);

    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
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
