const Joi = require("joi");

const validator = (schema) => (payload) =>
  schema.validate(payload, { abortEarly: false });

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

const deleteUserSchema = Joi.object({
  id: Joi.string()
    .guid({ version: ["uuidv4"] })
    .required(),
});

// Ledger Controller

// Category Controller

exports.validateRegister = validator(registerSchema);
exports.validateLogin = validator(loginSchema);
exports.validateDeleteUser = validator(deleteUserSchema);
