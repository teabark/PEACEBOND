const mongoose = require("mongoose");
const StaffUser = require("../models/StaffUser");

function isDatabaseConnected() {
  return mongoose.connection.readyState === 1;
}

async function loginStaff(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  if (!isDatabaseConnected()) {
    return res.status(503).json({ message: "Database is not connected." });
  }

  const staffUser = await StaffUser.findOne({
    email: email.toLowerCase().trim(),
    password,
  }).select("-password");

  if (!staffUser) {
    return res.status(401).json({ message: "Invalid staff credentials." });
  }

  return res.json({ staff: staffUser });
}

module.exports = {
  loginStaff,
};
