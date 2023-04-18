const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUsers,
  loginUser,
  deleteUser,
  createAdminUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authenticationMiddleware");
const { verify } = require("../middleware/authorizationMiddleware");

router.post("/", registerUser);
router.post("/admin", protect, verify, createAdminUser);
router.post("/login", loginUser);
router.get("/", protect, verify, getUsers);
router.delete("/", protect, deleteUser);

module.exports = router;
