const express = require("express");
const router = express.Router();
const {
  getCategories,
  addCategory,
  addUserCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { protect } = require("../middleware/authenticationMiddleware");
const { verify } = require("../middleware/authorizationMiddleware");

router.get("/", protect, getCategories);
router.post("/", protect, verify, addCategory);
router.post("/user-category", protect, addUserCategory);
router.delete("/", protect, verify, deleteCategory);

module.exports = router;
