const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUsers,
  loginUser,
  deleteUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/", getUsers);
router.delete("/", deleteUser);

module.exports = router;
