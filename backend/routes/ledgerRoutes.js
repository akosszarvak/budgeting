const express = require("express");
const router = express.Router();
const {
  getLedgers,
  addLedger,
  updateLedger,
  deleteLedger,
} = require("../controllers/ledgerController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addLedger);
router.post("/", protect, updateLedger);
router.get("/", protect, getLedgers);
router.delete("/", protect, deleteLedger);

module.exports = router;
