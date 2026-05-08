const express = require("express");
const { loginStaff } = require("../controllers/authController");

const router = express.Router();

router.post("/login", loginStaff);

module.exports = router;
