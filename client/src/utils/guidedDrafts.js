const categoryProfiles = [
  {
    key: "theft_livestock",
    label: "livestock restitution",
    keywords: ["theft", "stole", "stolen", "livestock", "cattle", "goat", "goats", "sheep"],
    repairFocus: "restitution, household repair, and mediated trust-building",
  },
  {
    key: "destruction_property",
    label: "property repair",
    keywords: ["destruction", "destroyed", "damaged", "burned", "broke", "broken", "vandalized", "property", "net", "nets", "kiosk"],
    repairFocus: "practical repair, material replacement, and restored safety",
  },
  {
    key: "militia_armed",
    label: "armed group reintegration",
    keywords: ["militia", "armed", "fighter", "weapon", "combatant", "rebel", "raid", "gun", "recruitment"],
    repairFocus: "accountability testimony, supervised service, and peaceful role formation",
  },
  {
    key: "violence_fighting",
    label: "violence or fighting",
    keywords: ["violence", "violent", "fight", "fighting", "assault", "hit", "injured", "beating", "attack"],
    repairFocus: "apology, safety commitments, and peace circle repair",
  },
  {
    key: "verbal_threats",
    label: "verbal threats",
    keywords: ["threat", "threats", "verbal", "insult", "intimidated", "harassed", "abuse"],
    repairFocus: "apology, mediation, and respectful communication",
  },
  {
    key: "land_dispute",
    label: "land dispute",
    keywords: ["land", "boundary", "farm", "field", "plot", "dispute", "border"],
    repairFocus: "boundary mediation, dialogue, and shared agreement",
  },
];

const fallbackProfile = {
  key: "general_harm",
  label: "community harm",
  repairFocus: "listening, practical repair, and mediated return",
};

function cleanText(value) {
  return typeof value === "string" ? value.trim() : "";
}

function sentence(value) {
  const text = cleanText(value);

  if (!text) {
    return "";
  }

  return text.endsWith(".") ? text : `${text}.`;
}

function joinSentences(parts) {
  return parts.filter(Boolean).map(sentence).join(" ");
}

function getPeaceBond(context = {}) {
  return context.peaceBond || {};
}

function getContextText(context = {}, answers = {}) {
  const peaceBond = getPeaceBond(context);
  return [
    context.currentValue,
    context.communityType,
    context.skills,
    context.severity,
    peaceBond.category,
    peaceBond.harmDescription,
    peaceBond.communityType,
    peaceBond.severity,
    ...Object.values(answers),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
}

function getCategoryProfile(context = {}, answers = {}) {
  const peaceBond = getPeaceBond(context);

  if (peaceBond.category) {
    return (
      categoryProfiles.find((profile) => profile.key === peaceBond.category) || fallbackProfile
    );
  }

  const contextText = getContextText(context, answers);
  return (
    categoryProfiles.find((profile) =>
      profile.keywords.some((keyword) => contextText.includes(keyword))
    ) || fallbackProfile
  );
}

function getPersonLabel(context = {}) {
  const peaceBond = getPeaceBond(context);
  const name = cleanText(context.fighterName || peaceBond.fighterName);
  const nationality = cleanText(context.nationality || peaceBond.nationality);

  if (name && nationality) {
    return `${name}, a ${nationality} rehabilitatee`;
  }

  if (name) {
    return name;
  }

  if (nationality) {
    return `the ${nationality} rehabilitatee`;
  }

  return "the rehabilitatee";
}

function getGrantText(context = {}) {
  const peaceBond = getPeaceBond(context);
  const grant = peaceBond.grant || {};

  if (!grant.amount && !peaceBond.grantAmount) {
    return "reintegration support";
  }

  const currency = grant.currency || "USD";
  const amount = grant.amount || peaceBond.grantAmount;
  const purpose = grant.purpose || peaceBond.grantPurpose || "reintegration support";
  return `${currency} ${amount} for ${purpose}`;
}

function getCompletedRepairText(context = {}) {
  const peaceBond = getPeaceBond(context);
  const repairActions = peaceBond.repairActions || [];
  const completedActions = context.completedActions || peaceBond.completedActions || [];
  const completed = repairActions.filter((_, index) => completedActions[index]);

  if (completed.length === 0 && repairActions.length > 0) {
    return repairActions.join("; ");
  }

  if (completed.length > 0) {
    return completed.join("; ");
  }

  return "the agreed repair actions";
}

function getToneLead(tone) {
  if (tone === "formal") {
    return "Staff recorded";
  }

  if (tone === "brief") {
    return "The case records";
  }

  if (tone === "detailed") {
    return "The completion record notes";
  }

  return "With care, staff recorded";
}

function trimForTone(text, tone) {
  if (tone !== "brief") {
    return text;
  }

  return text.split(". ").slice(0, 2).join(". ").replace(/\.$/, "");
}

function generateHarmDraft({ answers = {}, context = {}, tone = "warm", variant = 0 }) {
  const profile = getCategoryProfile(context, answers);
  const person = getPersonLabel(context);
  const communityType = cleanText(context.communityType) || "the community";
  const severity = cleanText(context.severity) || "moderate";
  const whatHappened =
    cleanText(answers.whatHappened) ||
    cleanText(context.currentValue) ||
    `a reported ${profile.label} concern`;
  const affected = cleanText(answers.affectedPeople) || "affected community members";
  const damaged = cleanText(answers.damagedItem);
  const repairNeed = cleanText(answers.desiredRepair) || profile.repairFocus;

  const opening =
    variant % 2 === 0
      ? `${getToneLead(tone)} a ${severity} PeaceBond case in ${communityType} involving ${person}`
      : `${person} is being supported through a ${severity} PeaceBond pathway in ${communityType}`;

  const detail = damaged
    ? `${whatHappened}, affecting ${affected} and damaging ${damaged}`
    : `${whatHappened}, affecting ${affected}`;
  const closing =
    tone === "formal"
      ? `The recommended restorative focus is ${repairNeed}, with accountability and dignity maintained throughout the process`
      : `The pathway should focus on ${repairNeed}, while keeping accountability, dignity, and reconciliation at the center`;

  return trimForTone(joinSentences([opening, detail, closing]), tone);
}

function generateCompletionReviewDraft({ answers = {}, context = {}, tone = "warm", variant = 0 }) {
  const peaceBond = getPeaceBond(context);
  const profile = getCategoryProfile(context, answers);
  const person = getPersonLabel(context);
  const completedRepair = cleanText(answers.whatCompleted) || getCompletedRepairText(context);
  const supportObserved =
    cleanText(answers.supportObserved) ||
    "participated respectfully in mediation and supervised repair support";
  const restitution =
    cleanText(answers.restitutionCompleted) ||
    "the agreed repair pathway was completed with staff review";
  const progress = context.progress || peaceBond.progress || 100;

  const opening =
    variant % 2 === 0
      ? `${getToneLead(tone)} that ${person} completed a ${profile.label} restorative pathway`
      : `${person} completed the restorative repair pathway with ${progress}% progress recorded`;
  const detail = `Completed repair actions included ${completedRepair}`;
  const closing =
    tone === "detailed"
      ? `${supportObserved}. Staff also noted that ${restitution}, supporting a careful return to community life`
      : `${supportObserved}, and ${restitution}`;

  return trimForTone(joinSentences([opening, detail, closing]), tone);
}

function generateCommunityAcknowledgmentDraft({
  answers = {},
  context = {},
  tone = "warm",
  variant = 0,
}) {
  const peaceBond = getPeaceBond(context);
  const communityType = peaceBond.communityType || context.communityType || "the community";
  const response =
    cleanText(answers.communityResponse) ||
    "community representatives acknowledged visible effort toward repair";
  const concerns =
    cleanText(answers.remainingConcerns) ||
    "continued peaceful participation and follow-up mediator contact";
  const welcome =
    cleanText(answers.welcomeSignals) ||
    "support for continued reintegration and respectful inclusion";

  const opening =
    variant % 2 === 0
      ? `Representatives from ${communityType} reported a constructive response to the repair pathway`
      : `${communityType} members acknowledged the repair pathway with care`;
  const detail = response;
  const closing =
    tone === "brief"
      ? `The community noted ${welcome}`
      : `Remaining attention should focus on ${concerns}, while the community noted ${welcome}`;

  return trimForTone(joinSentences([opening, detail, closing]), tone);
}

function generateStaffRecommendationDraft({
  answers = {},
  context = {},
  tone = "warm",
  variant = 0,
}) {
  const person = getPersonLabel(context);
  const profile = getCategoryProfile(context, answers);
  const support =
    cleanText(answers.supportRecommended) ||
    "continued reintegration support and community inclusion";
  const followUp =
    cleanText(answers.followUp) || "light follow-up check-ins with the mediator";
  const readiness =
    cleanText(answers.inclusionReadiness) ||
    "the completed repair actions and community acknowledgment";
  const grantText = getGrantText(context);

  const opening =
    variant % 2 === 0
      ? `Based on ${readiness}, PeaceBond staff recommend ${support} for ${person}`
      : `PeaceBond staff recommend that ${person} continue receiving ${support}`;
  const detail =
    tone === "formal"
      ? `This recommendation follows completion of the ${profile.label} pathway and the recorded grant support of ${grantText}`
      : `The recommendation is grounded in the ${profile.label} pathway, ${grantText}, and the dignity of a peaceful return`;
  const closing = `Staff also recommend ${followUp} so progress remains steady after certificate release`;

  return trimForTone(joinSentences([opening, detail, closing]), tone);
}

export function generateGuidedDraft({ answers, context, fieldType, tone, variant }) {
  if (fieldType === "harmDescription") {
    return generateHarmDraft({ answers, context, tone, variant });
  }

  if (fieldType === "completionReview") {
    return generateCompletionReviewDraft({ answers, context, tone, variant });
  }

  if (fieldType === "communityAcknowledgment") {
    return generateCommunityAcknowledgmentDraft({ answers, context, tone, variant });
  }

  if (fieldType === "staffRecommendation") {
    return generateStaffRecommendationDraft({ answers, context, tone, variant });
  }

  return "";
}
