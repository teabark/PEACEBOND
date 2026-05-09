const { defaultTemplate, peacebondTemplates } = require("./peacebondTemplates");
const {
  buildExplanation,
  buildGrantPurpose,
  buildRepairActions,
  getCategoryContent,
  normalizeLanguage,
  normalizeSeverity,
} = require("./localizedPeaceBondContent");

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

function buildGrantAmount(category, severity) {
  const range = severityGrantRanges[severity];
  const adjustment = categoryGrantAdjustments[category] || 0;
  return clamp(range.base + adjustment, range.min, range.max);
}

function generatePeaceBond({
  fighterName,
  harmDescription,
  language = "en",
  severity = "moderate",
  skills = "",
}) {
  const template = findTemplate(harmDescription);
  const normalizedLanguage = normalizeLanguage(language);
  const normalizedSeverity = normalizeSeverity(severity);
  const grantAmount = buildGrantAmount(template.category, normalizedSeverity);
  const grantPurpose = buildGrantPurpose(skills, normalizedLanguage);
  const categoryDetails = getCategoryContent(template.category, normalizedLanguage);

  return {
    caseTitle: categoryDetails.title,
    harmDescription: harmDescription.trim(),
    fighterName: fighterName.trim(),
    category: template.category,
    language: normalizedLanguage,
    severity: normalizedSeverity,
    repairActions: buildRepairActions(template.category, normalizedSeverity, normalizedLanguage),
    ritual: categoryDetails.ritual,
    grant: {
      amount: grantAmount,
      currency: "USD",
      purpose: grantPurpose,
    },
    grantAmount,
    grantPurpose,
    explanation: buildExplanation(template.category, normalizedSeverity, normalizedLanguage),
    completedActions: [false, false, false],
    progress: 0,
    grantReleased: false,
  };
}

module.exports = generatePeaceBond;
