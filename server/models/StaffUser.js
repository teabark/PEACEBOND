const mongoose = require("mongoose");

const staffUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "staff",
    },
    title: {
      type: String,
      trim: true,
      default: "PeaceBond Mediator",
    },
    communityFocus: {
      type: String,
      trim: true,
      default: "Community repair and reintegration",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("StaffUser", staffUserSchema);
