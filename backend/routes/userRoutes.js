const express = require("express");
const router = express.Router();
const {
  registerUser,
  getUsers,
  loginUser,
  deleteUser,
  registerAdminUser,
} = require("../controllers/userController");
const { protect } = require("../middleware/authenticationMiddleware");
const { verify } = require("../middleware/authorizationMiddleware");

router.post("/", registerUser);
router.post("/admin", protect, verify, registerAdminUser);
router.post("/login", loginUser);
router.get("/", protect, verify, getUsers);
router.delete("/", protect, verify, deleteUser);

module.exports = router;
