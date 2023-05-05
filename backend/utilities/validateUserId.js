const { validateId } = require("./joi-validators");

const validateUserId = (userId) => {
  console.log(userId);
  const { error } = validateId({ id: userId });
  if (error) {
    console.log("validation error: " + error.details[0].message);
    throw new Error(error.details[0].message);
  }
  //   return null;
};

module.exports = { validateUserId };
