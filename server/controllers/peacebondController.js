const mongoose = require("mongoose");
const PeaceBond = require("../models/PeaceBond");
const StaffUser = require("../models/StaffUser");
const generatePeaceBond = require("../utils/generatePeaceBond");

function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}

function isValidStaffId(staffUserId) {
  return staffUserId && mongoose.Types.ObjectId.isValid(staffUserId);
}

async function listPeaceBonds(req, res) {
  const { createdBy } = req.query;

  if (!isDatabaseConnected()) {
    return res.status(503).json({ message: "Database is not connected." });
  }

  if (!isValidStaffId(createdBy)) {
    return res.status(400).json({ message: "A valid staff user ID is required." });
  }

  const peaceBonds = await PeaceBond.find({ createdBy }).sort({ createdAt: -1 });
  return res.json(peaceBonds);
}

async function createPeaceBond(req, res) {
  const {
    communityType,
    createdBy,
    fighterName,
    harmDescription,
    phoneNumber,
    severity = "moderate",
    skills,
  } = req.body;

  if (!isDatabaseConnected()) {
    return res.status(503).json({ message: "Database is not connected." });
  }

  if (!isValidStaffId(createdBy)) {
    return res.status(400).json({ message: "A valid staff user ID is required." });
  }

  if (!fighterName || typeof fighterName !== "string" || !fighterName.trim()) {
    return res.status(400).json({ message: "A fighter name is required." });
  }

  if (!harmDescription || typeof harmDescription !== "string" || !harmDescription.trim()) {
    return res.status(400).json({ message: "A harm description is required." });
  }

  if (!["low", "moderate", "high"].includes(severity)) {
    return res.status(400).json({ message: "Severity must be low, moderate, or high." });
  }

  const staffUser = await StaffUser.findById(createdBy);

  if (!staffUser) {
    return res.status(404).json({ message: "Staff user not found." });
  }

  const peaceBond = await PeaceBond.create({
    ...generatePeaceBond({ fighterName, harmDescription, severity, skills }),
    phoneNumber: typeof phoneNumber === "string" ? phoneNumber.trim() : "",
    communityType: typeof communityType === "string" && communityType.trim()
      ? communityType.trim()
      : "General community",
    skills: typeof skills === "string" ? skills.trim() : "",
    createdBy,
  });

  return res.status(201).json(peaceBond);
}

async function getPeaceBond(req, res) {
  const { createdBy } = req.query;

  if (!isDatabaseConnected()) {
    return res.status(503).json({ message: "Database is not connected." });
  }

  if (!isValidStaffId(createdBy)) {
    return res.status(400).json({ message: "A valid staff user ID is required." });
  }

  const peaceBond = await PeaceBond.findOne({ _id: req.params.id, createdBy });

  if (!peaceBond) {
    return res.status(404).json({ message: "PeaceBond not found." });
  }

  return res.json(peaceBond);
}

async function updatePeaceBondProgress(req, res) {
  const { completedActions, createdBy } = req.body;

  if (!isDatabaseConnected()) {
    return res.status(503).json({ message: "Database is not connected." });
  }

  if (!isValidStaffId(createdBy)) {
    return res.status(400).json({ message: "A valid staff user ID is required." });
  }

  if (
    !Array.isArray(completedActions) ||
    completedActions.length !== 3 ||
    completedActions.some((action) => typeof action !== "boolean")
  ) {
    return res.status(400).json({
      message: "completedActions must contain exactly 3 true or false values.",
    });
  }

  const completedCount = completedActions.filter(Boolean).length;
  const progress = Math.round((completedCount / 3) * 100);
  const completionFields =
    progress === 100
      ? {
          completedAt: new Date(),
          grantReleased: true,
          grantReleasedAt: new Date(),
        }
      : {
          completedAt: null,
          grantReleased: false,
          grantReleasedAt: null,
        };

  const peaceBond = await PeaceBond.findOneAndUpdate(
    { _id: req.params.id, createdBy },
    { completedActions, progress, ...completionFields },
    { new: true, runValidators: true }
  );

  if (!peaceBond) {
    return res.status(404).json({ message: "PeaceBond not found." });
  }

  return res.json(peaceBond);
}

module.exports = {
  createPeaceBond,
  getPeaceBond,
  listPeaceBonds,
  updatePeaceBondProgress,
};
