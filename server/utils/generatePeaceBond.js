const { defaultTemplate, peacebondTemplates } = require("./peacebondTemplates");

const severityGrantAdjustments = {
  low: -20,
  moderate: 0,
  high: 60,
};

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

function buildGrant(templateGrant, severity) {
  const adjustment = severityGrantAdjustments[severity];

  return {
    ...templateGrant,
    amount: Math.max(50, templateGrant.amount + adjustment),
  };
}

function generatePeaceBond({ fighterName, harmDescription, severity = "moderate" }) {
  const template = findTemplate(harmDescription);
  const normalizedSeverity = normalizeSeverity(severity);

  return {
    harmDescription: harmDescription.trim(),
    fighterName: fighterName.trim(),
    category: template.category,
    repairActions: template.repairActions,
    ritual: template.ritual,
    severity: normalizedSeverity,
    grant: buildGrant(template.grant, normalizedSeverity),
    completedActions: [false, false, false],
    progress: 0,
    grantReleased: false,
  };
}

module.exports = generatePeaceBond;
