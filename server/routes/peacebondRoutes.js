const express = require("express");
const {
  createPeaceBond,
  getPeaceBond,
  listPeaceBonds,
  submitCompletionReport,
  updatePeaceBondProgress,
} = require("../controllers/peacebondController");

const router = express.Router();

router.get("/", listPeaceBonds);
router.post("/", createPeaceBond);
router.get("/:id", getPeaceBond);
router.patch("/:id/progress", updatePeaceBondProgress);
router.patch("/:id/completion-report", submitCompletionReport);

module.exports = router;
