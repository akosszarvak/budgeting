const { getDb } = require("../db/db");

const updateBalance = async (user_id, amount, trans_type) => {
  let transaction = trans_type === "EXP" ? amount * -1 : amount;

  try {
    const balance = await getDb().query(
      "SELECT balance FROM users WHERE id = $1",
      [user_id]
    );

    const newBalance = parseInt(balance[0].balance) + transaction;
    const updatedBalance = await getDb().query(
      "UPDATE users SET balance = $1 WHERE id = $2",
      [newBalance, user_id]
    );
  } catch (error) {
    console.log(error);
    throw new Error("Incorrect balance or user");
  }
};

module.exports = { updateBalance };
