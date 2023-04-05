const express = require("express");
const router = express.Router();
const {
  getCategories,
  addCategory,
  addUserCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getCategories);
router.post("/", protect, addCategory);
router.post("/user-category", protect, addUserCategory);
router.delete("/", protect, deleteCategory);

module.exports = router;
