const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

const idSchema = Joi.object({
  id: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
});

// User Controller
const registerSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

// Ledger Controller
const addLedgerSchema = Joi.object({
  category_id: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
  trans_type: Joi.string().valid("INC", "EXP"),
  name: Joi.string().required(),
  note: Joi.string().allow(""),
  amount: Joi.number().required().positive(),
});

const getLastLedgersSchema = Joi.object({
  limit: Joi.number().required().positive(),
});

const getLedgersBetweenSchema = Joi.object({
  start: Joi.date().required(),
  end: Joi.date().required(),
});
// Category Controller

exports.validateRegister = validator(registerSchema);
exports.validateLogin = validator(loginSchema);
exports.validateDeleteUser = validator(idSchema);

exports.validateAddLedger = validator(addLedgerSchema);
exports.validateDeleteLedger = validator(idSchema);
exports.validateGetLastLedgers = validator(getLastLedgersSchema);
exports.validateGetLedgersBetween = validator(getLedgersBetweenSchema);
