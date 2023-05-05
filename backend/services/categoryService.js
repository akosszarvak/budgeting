const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const { getDb } = require("../db/db");

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

module.exports = { deleteAllUserLedgers };
