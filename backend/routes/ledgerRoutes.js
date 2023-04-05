const express = require("express");
const router = express.Router();
const {
  getLedgers,
  addLedger,
  updateLedger,
  deleteLedger,
  getBalance,
} = require("../controllers/ledgerController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addLedger);
router.get("/", protect, getLedgers);
router.get("/balance", protect, getBalance);
// router.post("/", protect, updateLedger);
router.delete("/", protect, deleteLedger);

module.exports = router;
