const express = require("express");
const {
  createPeaceBond,
  getPeaceBond,
  listPeaceBonds,
  updatePeaceBondProgress,
} = require("../controllers/peacebondController");

const router = express.Router();

router.get("/", listPeaceBonds);
router.post("/", createPeaceBond);
router.get("/:id", getPeaceBond);
router.patch("/:id/progress", updatePeaceBondProgress);

module.exports = router;
