const express = require("express");
const router = express.Router();
const {
  addCategory,
  addUserCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addCategory);
router.post("/", protect, addUserCategory);
router.delete("/", protect, deleteCategory);
// router.get("/", protect, getLedgers);

module.exports = router;
