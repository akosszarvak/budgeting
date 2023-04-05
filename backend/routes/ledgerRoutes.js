const express = require("express");
const router = express.Router();
const {
  getLedgers,
  getLastLedgers,
  getBalance,
  getLedgersBetween,
  addLedger,
  updateLedger,
  deleteLedger,
} = require("../controllers/ledgerController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, addLedger);
router.get("/", protect, getLedgers);
router.get("/last", protect, getLastLedgers);
router.get("/balance", protect, getBalance);
router.get("/between-dates", protect, getLedgersBetween);
// router.post("/", protect, updateLedger);
router.delete("/", protect, deleteLedger);

module.exports = router;
