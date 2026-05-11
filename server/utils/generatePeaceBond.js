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
  displacement_impact: 8,
  general_harm: -3,
  land_dispute: 0,
  livelihood_disruption: 4,
  militia_armed: 10,
  resource_theft: 2,
  theft_livestock: 0,
  verbal_threats: -2,
  violence_fighting: 5,
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function findTemplate(harmDescription) {
  const normalizedDescription = harmDescription.toLowerCase();
  const rankedTemplate = peacebondTemplates
    .map((template) => ({
      score: template.keywords.filter((keyword) => normalizedDescription.includes(keyword))
        .length,
      template,
    }))
    .sort((first, second) => second.score - first.score)[0];

  return rankedTemplate?.score > 0 ? rankedTemplate.template : defaultTemplate;
}

function buildGrantAmount(category, severity) {
  const range = severityGrantRanges[severity];
  const adjustment = categoryGrantAdjustments[category] || 0;
  return clamp(range.base + adjustment, range.min, range.max);
}

function generatePeaceBond({
  fighterName,
  communityImpact = "",
  communityType = "General community",
  harmDescription,
  language = "en",
  livelihoodType = "",
  reintegrationContext = "",
  severity = "moderate",
  skills = "",
}) {
  const template = findTemplate(harmDescription);
  const normalizedLanguage = normalizeLanguage(language);
  const normalizedSeverity = normalizeSeverity(severity);
  const context = {
    communityImpact,
    communityType,
    livelihoodType,
    reintegrationContext,
  };
  const grantAmount = buildGrantAmount(template.category, normalizedSeverity);
  const grantPurpose = buildGrantPurpose({ category: template.category, context, skills }, normalizedLanguage);
  const categoryDetails = getCategoryContent(template.category, normalizedLanguage);

  return {
    caseTitle: categoryDetails.title,
    harmDescription: harmDescription.trim(),
    fighterName: fighterName.trim(),
    category: template.category,
    communityImpact: typeof communityImpact === "string" ? communityImpact.trim() : "",
    communityType: typeof communityType === "string" && communityType.trim()
      ? communityType.trim()
      : "General community",
    language: normalizedLanguage,
    livelihoodType: typeof livelihoodType === "string" ? livelihoodType.trim() : "",
    reintegrationContext:
      typeof reintegrationContext === "string" ? reintegrationContext.trim() : "",
    severity: normalizedSeverity,
    repairActions: buildRepairActions(
      template.category,
      normalizedSeverity,
      normalizedLanguage,
      context
    ),
    ritual: categoryDetails.ritual,
    grant: {
      amount: grantAmount,
      currency: "USD",
      purpose: grantPurpose,
    },
    grantAmount,
    grantPurpose,
    explanation: buildExplanation(template.category, normalizedSeverity, normalizedLanguage, context),
    completedActions: [false, false, false],
    progress: 0,
    grantReleased: false,
  };
}

module.exports = generatePeaceBond;
