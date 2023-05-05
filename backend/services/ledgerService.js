const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const { getDb } = require("../db/db");

const getUserLedgers = async ({ user_id }) => {
  try {
    const ledgers = await getDb().any(
      "SELECT l.id, l.trans_type, l.name, l.amount, l.created_at, l.note, c.name AS category FROM ledgers l INNER JOIN categories c ON l.category_id = c.id WHERE l.user_id = $1",
      [user_id]
    );
    return ledgers;
  } catch (err) {
    console.error("ERROR: ", err);

    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};

const getUserLastLedgers = async ({ user_id, limit }) => {
  try {
    const lastLedgers = await getDb().any(
      "SELECT l.id, l.trans_type, l.name, l.amount, l.created_at, l.note, c.name AS category FROM ledgers l INNER JOIN categories c ON l.category_id = c.id WHERE l.user_id = $1 ORDER BY l.created_at DESC LIMIT $2",
      [user_id, limit]
    );
    return lastLedgers;
  } catch (err) {
    console.error("ERROR: ", err);

    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};

const getUserLedgersBetween = async ({ user_id, start, end }) => {
  try {
    const ledgersBetween = await getDb().any(
      "SELECT l.id, l.trans_type, l.name, l.amount, l.created_at, l.note, c.name AS category FROM ledgers l INNER JOIN categories c ON l.category_id = c.id WHERE l.user_id = $1 AND l.created_at BETWEEN $2 AND $3 ORDER BY l.created_at DESC",
      [user_id, start, end]
    );
    return ledgersBetween;
  } catch (err) {
    console.error("ERROR: ", err);

    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};

const getUserBalance = async ({ user_id, start, end }) => {
  try {
    const balance = await getDb().any(
      "SELECT SUM(CASE WHEN trans_type = 'INC' THEN amount ELSE 0 END) AS INCOME, SUM(CASE WHEN trans_type = 'EXP' THEN amount ELSE 0 END) AS EXPENSE FROM ledgers WHERE user_id = $1",
      [user_id]
    );

    return balance;
  } catch (err) {
    console.error("ERROR: ", err);

    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};

const createLedger = async ({
  user_id,
  category_id,
  trans_type,
  name,
  amount,
  note,
}) => {
  try {
    const id = uuidv4();
    const ledger = await getDb().any(
      "INSERT INTO ledgers (id, user_id, category_id, trans_type, name, amount, note) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [id, user_id, category_id, trans_type, name, amount, note]
    );

    return ledger;
  } catch (err) {
    console.error("ERROR: ", err);

    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};

const deleteUserLedger = async ({ id, user_id }) => {
  try {
    const ledger = await getDb().query(
      "DELETE FROM ledgers WHERE id = $1 AND user_id = $2",
      [id, user_id]
    );

    return true;
  } catch (err) {
    console.error("ERROR: ", err);

    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};

const deleteAllUserLedgers = async ({ id }) => {
  try {
    const deleteLedgers = await getDb().query(
      "DELETE FROM ledgers WHERE user_id = $1",
      [id]
    );

    return true;
  } catch (err) {
    console.error("ERROR: ", err);

    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};

module.exports = {
  getUserLedgers,
  getUserLastLedgers,
  getUserLedgersBetween,
  getUserBalance,
  createLedger,
  deleteUserLedger,
  deleteAllUserLedgers,
};
