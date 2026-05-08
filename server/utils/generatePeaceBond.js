const { defaultTemplate, peacebondTemplates } = require("./peacebondTemplates");

const severityGrantRanges = {
  low: { base: 25, max: 30, min: 20 },
  moderate: { base: 42, max: 50, min: 35 },
  high: { base: 70, max: 80, min: 60 },
};

const categoryGrantAdjustments = {
  destruction_property: 5,
  general_harm: -3,
  land_dispute: 0,
  militia_armed: 10,
  theft_livestock: 0,
  verbal_threats: -2,
  violence_fighting: 5,
};

const skillGrantPurposes = [
  {
    keywords: ["farm", "farming", "farmer", "agriculture", "crop"],
    purpose: "Reintegration support for seeds and basic farming tools.",
  },
  {
    keywords: ["carpentry", "carpenter", "wood", "joinery"],
    purpose: "Reintegration support for hand tools and wood materials.",
  },
  {
    keywords: ["tailor", "tailoring", "sewing", "seamstress"],
    purpose: "Reintegration support for fabric and sewing supplies.",
  },
  {
    keywords: ["mechanic", "repair", "garage", "motorbike", "vehicle"],
    purpose: "Reintegration support for basic repair tools.",
  },
  {
    keywords: ["trade", "trading", "business", "shop", "vendor", "market"],
    purpose: "Reintegration support for small stock or starter goods.",
  },
];

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function findTemplate(harmDescription) {
  const normalizedDescription = harmDescription.toLowerCase();

  return (
    peacebondTemplates.find((template) =>
      template.keywords.some((keyword) => normalizedDescription.includes(keyword))
    ) || defaultTemplate
  );
}

function normalizeSeverity(severity) {
  if (["low", "moderate", "high"].includes(severity)) {
    return severity;
  }

  return "moderate";
}

function buildGrantAmount(category, severity) {
  const range = severityGrantRanges[severity];
  const adjustment = categoryGrantAdjustments[category] || 0;
  return clamp(range.base + adjustment, range.min, range.max);
}

function buildGrantPurpose(skills) {
  const normalizedSkills = typeof skills === "string" ? skills.toLowerCase() : "";
  const matchingPurpose = skillGrantPurposes.find((skillPurpose) =>
    skillPurpose.keywords.some((keyword) => normalizedSkills.includes(keyword))
  );

  return matchingPurpose?.purpose || "Reintegration starter support for a stable peaceful return.";
}

function buildExplanation(template, severity) {
  return `This PeaceBond was generated from a ${template.categoryLabel} case with ${severity} severity. The plan focuses on ${template.focus}. Severity determines the depth of repair and support, not punishment.`;
}

function generatePeaceBond({ fighterName, harmDescription, severity = "moderate", skills = "" }) {
  const template = findTemplate(harmDescription);
  const normalizedSeverity = normalizeSeverity(severity);
  const grantAmount = buildGrantAmount(template.category, normalizedSeverity);
  const grantPurpose = buildGrantPurpose(skills);

  return {
    harmDescription: harmDescription.trim(),
    fighterName: fighterName.trim(),
    category: template.category,
    severity: normalizedSeverity,
    repairActions: template.repairActions[normalizedSeverity],
    ritual: template.ritual,
    grant: {
      amount: grantAmount,
      currency: "USD",
      purpose: grantPurpose,
    },
    grantAmount,
    grantPurpose,
    explanation: buildExplanation(template, normalizedSeverity),
    completedActions: [false, false, false],
    progress: 0,
    grantReleased: false,
  };
}

module.exports = generatePeaceBond;
