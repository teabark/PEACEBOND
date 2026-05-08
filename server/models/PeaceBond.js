const mongoose = require("mongoose");

const peaceBondSchema = new mongoose.Schema(
  {
    harmDescription: {
      type: String,
      required: true,
      trim: true,
    },
    fighterName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
      default: "",
    },
    communityType: {
      type: String,
      trim: true,
      default: "General community",
    },
    skills: {
      type: String,
      trim: true,
      default: "",
    },
    severity: {
      type: String,
      enum: ["low", "moderate", "high"],
      default: "moderate",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StaffUser",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    repairActions: {
      type: [String],
      required: true,
      validate: {
        validator(actions) {
          return actions.length === 3;
        },
        message: "A PeaceBond must include exactly 3 repair actions.",
      },
    },
    ritual: {
      type: String,
      required: true,
    },
    grant: {
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        default: "USD",
      },
      purpose: {
        type: String,
        required: true,
      },
    },
    completedActions: {
      type: [Boolean],
      default: [false, false, false],
    },
    progress: {
      type: Number,
      default: 0,
    },
    grantReleased: {
      type: Boolean,
      default: false,
    },
    grantReleasedAt: {
      type: Date,
      default: null,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PeaceBond", peaceBondSchema);
