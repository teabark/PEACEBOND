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
    nationality: {
      type: String,
      trim: true,
      default: "",
    },
    protectedIdentity: {
      type: Boolean,
      default: false,
    },
    participantId: {
      type: String,
      trim: true,
      default: "",
    },
    communityType: {
      type: String,
      trim: true,
      default: "General community",
    },
    livelihoodType: {
      type: String,
      trim: true,
      default: "",
    },
    reintegrationContext: {
      type: String,
      trim: true,
      default: "",
    },
    communityImpact: {
      type: String,
      trim: true,
      default: "",
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
    caseTitle: {
      type: String,
      trim: true,
      default: "",
    },
    language: {
      type: String,
      enum: ["en", "sw", "fr", "pt", "ar"],
      default: "en",
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
    explanation: {
      type: String,
      required: true,
      trim: true,
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
    grantAmount: {
      type: Number,
      required: true,
    },
    grantPurpose: {
      type: String,
      required: true,
      trim: true,
    },
    completedActions: {
      type: [Boolean],
      default: [false, false, false],
    },
    progress: {
      type: Number,
      default: 0,
    },
    completionReport: {
      summary: {
        type: String,
        trim: true,
        default: "",
      },
      communityResponse: {
        type: String,
        trim: true,
        default: "",
      },
      staffRecommendation: {
        type: String,
        trim: true,
        default: "",
      },
    },
    reportSubmitted: {
      type: Boolean,
      default: false,
    },
    completionReviewed: {
      type: Boolean,
      default: false,
    },
    reportSubmittedAt: {
      type: Date,
      default: null,
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
    demoSeedKey: {
      type: String,
      trim: true,
      index: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("PeaceBond", peaceBondSchema);
