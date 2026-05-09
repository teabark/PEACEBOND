import { translateWithFallback } from "./i18n.js";
import { translateRepairActions } from "./peacebondContent.js";
import { getParticipantId, isProtectedIdentity } from "./protectedIdentity.js";

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

const localizedCategoryProfiles = {
  sw: {
    theft_livestock: {
      label: "fidia ya mifugo",
      repairFocus: "fidia, kurekebisha kaya, na kujenga uaminifu kupitia upatanisho",
    },
    destruction_property: {
      label: "marekebisho ya mali",
      repairFocus: "marekebisho ya vitendo, kubadilisha vifaa, na kurejesha usalama",
    },
    militia_armed: {
      label: "urejeshwaji kutoka kundi lenye silaha",
      repairFocus: "ushahidi wa uwajibikaji, huduma inayosimamiwa, na kujenga nafasi ya amani",
    },
    violence_fighting: {
      label: "vurugu au mapigano",
      repairFocus: "kuomba radhi, ahadi za usalama, na marekebisho kupitia duara la amani",
    },
    verbal_threats: {
      label: "vitisho vya maneno",
      repairFocus: "kuomba radhi, upatanisho, na mawasiliano ya heshima",
    },
    land_dispute: {
      label: "mgogoro wa ardhi",
      repairFocus: "upatanishi wa mipaka, mazungumzo, na makubaliano ya pamoja",
    },
    general_harm: {
      label: "madhara ya jamii",
      repairFocus: "kusikiliza, marekebisho ya vitendo, na kurudi kwa upatanisho",
    },
  },
  fr: {
    theft_livestock: {
      label: "restitution du betail",
      repairFocus: "restitution, reparation du foyer et retablissement de la confiance par la mediation",
    },
    destruction_property: {
      label: "reparation de biens",
      repairFocus: "reparation pratique, remplacement materiel et securite restauree",
    },
    militia_armed: {
      label: "reintegration apres groupe arme",
      repairFocus: "temoignage de responsabilite, service supervise et formation d'un role pacifique",
    },
    violence_fighting: {
      label: "violence ou bagarre",
      repairFocus: "excuses, engagements de securite et cercle de paix reparateur",
    },
    verbal_threats: {
      label: "menaces verbales",
      repairFocus: "excuses, mediation et communication respectueuse",
    },
    land_dispute: {
      label: "conflit foncier",
      repairFocus: "mediation des limites, dialogue et accord partage",
    },
    general_harm: {
      label: "prejudice communautaire",
      repairFocus: "ecoute, reparation pratique et retour medie",
    },
  },
  pt: {
    theft_livestock: {
      label: "restituicao de gado",
      repairFocus: "restituicao, reparacao familiar e construcao de confianca mediada",
    },
    destruction_property: {
      label: "reparacao de propriedade",
      repairFocus: "reparacao pratica, reposicao de materiais e seguranca restaurada",
    },
    militia_armed: {
      label: "reintegracao apos grupo armado",
      repairFocus: "testemunho de responsabilidade, servico supervisionado e papel pacifico",
    },
    violence_fighting: {
      label: "violencia ou briga",
      repairFocus: "pedido de desculpas, compromissos de seguranca e circulo de paz",
    },
    verbal_threats: {
      label: "ameacas verbais",
      repairFocus: "pedido de desculpas, mediacao e comunicacao respeitosa",
    },
    land_dispute: {
      label: "disputa de terra",
      repairFocus: "mediacao de limites, dialogo e acordo partilhado",
    },
    general_harm: {
      label: "dano comunitario",
      repairFocus: "escuta, reparacao pratica e retorno mediado",
    },
  },
  ar: {
    theft_livestock: {
      label: "رد حق المواشي",
      repairFocus: "رد الحق، إصلاح العلاقة مع الأسرة، وبناء الثقة بوساطة",
    },
    destruction_property: {
      label: "إصلاح الممتلكات",
      repairFocus: "إصلاح عملي، تعويض مواد، واستعادة الأمان",
    },
    militia_armed: {
      label: "إعادة الإدماج بعد جماعة مسلحة",
      repairFocus: "شهادة مسؤولية، خدمة بإشراف، وتكوين دور سلمي",
    },
    violence_fighting: {
      label: "العنف أو الشجار",
      repairFocus: "اعتذار، التزامات سلامة، ودائرة سلام",
    },
    verbal_threats: {
      label: "تهديدات لفظية",
      repairFocus: "اعتذار، وساطة، وتواصل محترم",
    },
    land_dispute: {
      label: "نزاع أرض",
      repairFocus: "وساطة حدود، حوار، واتفاق مشترك",
    },
    general_harm: {
      label: "ضرر مجتمعي",
      repairFocus: "استماع، إصلاح عملي، وعودة بوساطة",
    },
  },
};

const draftPhrases = {
  en: {
    affectedMembers: "affected community members",
    agreedActions: "the agreed repair actions",
    defaultCommunity: "the community",
    defaultSeverity: "moderate",
    grantConnector: "for",
    reintegrationSupport: "reintegration support",
    restitution: "the agreed repair pathway was completed with staff review",
    supportObserved: "participated respectfully in mediation and supervised repair support",
    participant: "Participant",
    personFallback: "the rehabilitatee",
    personWithNationality(name, nationality) {
      return `${name}, a ${nationality} rehabilitatee`;
    },
    nationalityOnly(nationality) {
      return `the ${nationality} rehabilitatee`;
    },
    toneLead(tone) {
      if (tone === "formal") return "Staff recorded";
      if (tone === "brief") return "The case records";
      if (tone === "detailed") return "The completion record notes";
      return "With care, staff recorded";
    },
  },
  sw: {
    affectedMembers: "wanajamii walioathiriwa",
    agreedActions: "matendo ya marekebisho yaliyokubaliwa",
    defaultCommunity: "jamii",
    defaultSeverity: "wastani",
    grantConnector: "kwa ajili ya",
    reintegrationSupport: "msaada wa urejeshwaji",
    restitution: "njia ya marekebisho iliyokubaliwa ilikamilika kwa mapitio ya wafanyakazi",
    supportObserved: "alishiriki kwa heshima katika upatanisho na msaada wa marekebisho uliosimamiwa",
    participant: "Mshiriki",
    personFallback: "anayerejeshwa",
    personWithNationality(name, nationality) {
      return `${name}, anayerejeshwa mwenye uraia wa ${nationality}`;
    },
    nationalityOnly(nationality) {
      return `anayerejeshwa mwenye uraia wa ${nationality}`;
    },
    toneLead(tone) {
      if (tone === "formal") return "Wafanyakazi walirekodi";
      if (tone === "brief") return "Rekodi ya kesi inaonyesha";
      if (tone === "detailed") return "Rekodi ya ukamilishaji inaeleza";
      return "Kwa uangalifu, wafanyakazi walirekodi";
    },
  },
  fr: {
    affectedMembers: "les membres de la communaute affectes",
    agreedActions: "les actions de reparation convenues",
    defaultCommunity: "la communaute",
    defaultSeverity: "moderee",
    grantConnector: "pour",
    reintegrationSupport: "le soutien a la reintegration",
    restitution: "le parcours de reparation convenu a ete termine avec examen du personnel",
    supportObserved: "a participe avec respect a la mediation et au soutien de reparation supervise",
    participant: "Participant",
    personFallback: "la personne accompagnee",
    personWithNationality(name, nationality) {
      return `${name}, personne accompagnee de nationalite ${nationality}`;
    },
    nationalityOnly(nationality) {
      return `la personne accompagnee de nationalite ${nationality}`;
    },
    toneLead(tone) {
      if (tone === "formal") return "Le personnel a enregistre";
      if (tone === "brief") return "Le dossier indique";
      if (tone === "detailed") return "Le dossier d'achevement note";
      return "Avec soin, le personnel a enregistre";
    },
  },
  pt: {
    affectedMembers: "membros afetados da comunidade",
    agreedActions: "as acoes de reparacao acordadas",
    defaultCommunity: "a comunidade",
    defaultSeverity: "moderada",
    grantConnector: "para",
    reintegrationSupport: "apoio a reintegracao",
    restitution: "o caminho de reparacao acordado foi concluido com revisao da equipe",
    supportObserved: "participou com respeito da mediacao e do apoio de reparacao supervisionado",
    participant: "Participante",
    personFallback: "a pessoa em reintegracao",
    personWithNationality(name, nationality) {
      return `${name}, pessoa em reintegracao de nacionalidade ${nationality}`;
    },
    nationalityOnly(nationality) {
      return `a pessoa em reintegracao de nacionalidade ${nationality}`;
    },
    toneLead(tone) {
      if (tone === "formal") return "A equipe registrou";
      if (tone === "brief") return "O registro do caso indica";
      if (tone === "detailed") return "O registro de conclusao observa";
      return "Com cuidado, a equipe registrou";
    },
  },
  ar: {
    affectedMembers: "أفراد المجتمع المتأثرون",
    agreedActions: "أفعال الإصلاح المتفق عليها",
    defaultCommunity: "المجتمع",
    defaultSeverity: "متوسطة",
    grantConnector: "من أجل",
    reintegrationSupport: "دعم إعادة الإدماج",
    restitution: "اكتمل مسار الإصلاح المتفق عليه مع مراجعة الفريق",
    supportObserved: "شارك باحترام في الوساطة ودعم الإصلاح بإشراف",
    participant: "مشارك",
    personFallback: "الشخص العائد",
    personWithNationality(name, nationality) {
      return `${name}، شخص عائد يحمل جنسية ${nationality}`;
    },
    nationalityOnly(nationality) {
      return `الشخص العائد الذي يحمل جنسية ${nationality}`;
    },
    toneLead(tone) {
      if (tone === "formal") return "سجل الفريق";
      if (tone === "brief") return "يوضح سجل الحالة";
      if (tone === "detailed") return "يشير سجل الإكمال";
      return "بعناية، سجل الفريق";
    },
  },
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

function getDraftPhrases(language = "en") {
  return draftPhrases[language] || draftPhrases.en;
}

function getProfileText(profile, language, field) {
  return localizedCategoryProfiles[language]?.[profile.key]?.[field] || profile[field];
}

function getSeverityText(value, language) {
  const severity = cleanText(value);
  if (!severity) {
    return getDraftPhrases(language).defaultSeverity;
  }

  return ["high", "low", "moderate"].includes(severity)
    ? translateWithFallback(language, `severity.${severity}`)
    : severity;
}

function getPersonLabel(context = {}, language = "en") {
  const peaceBond = getPeaceBond(context);
  const phrases = getDraftPhrases(language);

  if (isProtectedIdentity(peaceBond)) {
    const participantId = getParticipantId(peaceBond);
    return participantId ? `${phrases.participant} ${participantId}` : phrases.personFallback;
  }

  const name = cleanText(context.fighterName || peaceBond.fighterName);
  const nationality = cleanText(context.nationality || peaceBond.nationality);

  if (name && nationality) {
    return phrases.personWithNationality(name, nationality);
  }

  if (name) {
    return name;
  }

  if (nationality) {
    return phrases.nationalityOnly(nationality);
  }

  return phrases.personFallback;
}

function getGrantText(context = {}, language = "en") {
  const peaceBond = getPeaceBond(context);
  const phrases = getDraftPhrases(language);
  const grant = peaceBond.grant || {};

  if (!grant.amount && !peaceBond.grantAmount) {
    return phrases.reintegrationSupport;
  }

  const currency = grant.currency || "USD";
  const amount = grant.amount || peaceBond.grantAmount;
  const purpose = grant.purpose || peaceBond.grantPurpose || phrases.reintegrationSupport;
  return `${currency} ${amount} ${phrases.grantConnector} ${purpose}`;
}

function getCompletedRepairText(context = {}, language = "en") {
  const peaceBond = getPeaceBond(context);
  const phrases = getDraftPhrases(language);
  const repairActions = translateRepairActions(peaceBond, language);
  const completedActions = context.completedActions || peaceBond.completedActions || [];
  const completed = repairActions.filter((_, index) => completedActions[index]);

  if (completed.length === 0 && repairActions.length > 0) {
    return repairActions.join("; ");
  }

  if (completed.length > 0) {
    return completed.join("; ");
  }

  return phrases.agreedActions;
}

function getToneLead(tone, language = "en") {
  return getDraftPhrases(language).toneLead(tone);
}

function trimForTone(text, tone) {
  if (tone !== "brief") {
    return text;
  }

  return text.split(". ").slice(0, 2).join(". ").replace(/\.$/, "");
}

function generateHarmDraft({
  answers = {},
  context = {},
  language = "en",
  tone = "warm",
  variant = 0,
}) {
  const phrases = getDraftPhrases(language);
  const profile = getCategoryProfile(context, answers);
  const person = getPersonLabel(context, language);
  const communityType = cleanText(context.communityType) || phrases.defaultCommunity;
  const severity = getSeverityText(context.severity, language);
  const profileLabel = getProfileText(profile, language, "label");
  const repairFocus = getProfileText(profile, language, "repairFocus");
  const whatHappened =
    cleanText(answers.whatHappened) ||
    cleanText(context.currentValue) ||
    (language === "sw"
      ? `wasiwasi ulioripotiwa kuhusu ${profileLabel}`
      : language === "fr"
        ? `une preoccupation signalee liee a ${profileLabel}`
        : language === "pt"
          ? `uma preocupacao registrada sobre ${profileLabel}`
          : language === "ar"
            ? `قلق مسجل بشأن ${profileLabel}`
            : `a reported ${profileLabel} concern`);
  const affected = cleanText(answers.affectedPeople) || phrases.affectedMembers;
  const damaged = cleanText(answers.damagedItem);
  const repairNeed = cleanText(answers.desiredRepair) || repairFocus;

  if (language === "sw") {
    const opening =
      variant % 2 === 0
        ? `${getToneLead(tone, language)} kesi ya PeaceBond yenye uzito wa ${severity} katika ${communityType} inayomhusu ${person}`
        : `${person} anaungwa mkono kupitia njia ya PeaceBond yenye uzito wa ${severity} katika ${communityType}`;
    const detail = damaged
      ? `${whatHappened}, ikiathiri ${affected} na kuharibu ${damaged}`
      : `${whatHappened}, ikiathiri ${affected}`;
    const closing =
      tone === "formal"
        ? `Lengo la marekebisho linalopendekezwa ni ${repairNeed}, huku uwajibikaji na heshima vikidumishwa katika mchakato wote`
        : `Njia hii inapaswa kuzingatia ${repairNeed}, huku uwajibikaji, heshima, na upatanisho vikibaki katikati`;

    return trimForTone(joinSentences([opening, detail, closing]), tone);
  }

  if (language === "fr") {
    const opening =
      variant % 2 === 0
        ? `${getToneLead(tone, language)} un cas PeaceBond de gravite ${severity} dans ${communityType} impliquant ${person}`
        : `${person} est accompagnee dans un parcours PeaceBond de gravite ${severity} dans ${communityType}`;
    const detail = damaged
      ? `${whatHappened}, affectant ${affected} et endommageant ${damaged}`
      : `${whatHappened}, affectant ${affected}`;
    const closing =
      tone === "formal"
        ? `L'orientation restauratrice recommandee est ${repairNeed}, avec responsabilite et dignite maintenues tout au long du processus`
        : `Le parcours devrait se concentrer sur ${repairNeed}, en gardant la responsabilite, la dignite et la reconciliation au centre`;

    return trimForTone(joinSentences([opening, detail, closing]), tone);
  }

  if (language === "pt") {
    const opening =
      variant % 2 === 0
        ? `${getToneLead(tone, language)} um caso PeaceBond de gravidade ${severity} em ${communityType} envolvendo ${person}`
        : `${person} esta sendo apoiada por um caminho PeaceBond de gravidade ${severity} em ${communityType}`;
    const detail = damaged
      ? `${whatHappened}, afetando ${affected} e danificando ${damaged}`
      : `${whatHappened}, afetando ${affected}`;
    const closing =
      tone === "formal"
        ? `O foco restaurativo recomendado e ${repairNeed}, mantendo responsabilidade e dignidade durante todo o processo`
        : `O caminho deve focar em ${repairNeed}, mantendo responsabilidade, dignidade e reconciliacao no centro`;

    return trimForTone(joinSentences([opening, detail, closing]), tone);
  }

  if (language === "ar") {
    const opening =
      variant % 2 === 0
        ? `${getToneLead(tone, language)} حالة PeaceBond بدرجة ${severity} في ${communityType} تخص ${person}`
        : `يتم دعم ${person} عبر مسار PeaceBond بدرجة ${severity} في ${communityType}`;
    const detail = damaged
      ? `${whatHappened}، مما أثر على ${affected} وأضر بـ ${damaged}`
      : `${whatHappened}، مما أثر على ${affected}`;
    const closing =
      tone === "formal"
        ? `محور الإصلاح الموصى به هو ${repairNeed} مع الحفاظ على المسؤولية والكرامة طوال العملية`
        : `ينبغي أن يركز المسار على ${repairNeed} مع إبقاء المسؤولية والكرامة والمصالحة في المركز`;

    return trimForTone(joinSentences([opening, detail, closing]), tone);
  }

  const opening =
    variant % 2 === 0
      ? `${getToneLead(tone, language)} a ${severity} PeaceBond case in ${communityType} involving ${person}`
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

function generateCompletionReviewDraft({
  answers = {},
  context = {},
  language = "en",
  tone = "warm",
  variant = 0,
}) {
  const peaceBond = getPeaceBond(context);
  const phrases = getDraftPhrases(language);
  const profile = getCategoryProfile(context, answers);
  const profileLabel = getProfileText(profile, language, "label");
  const person = getPersonLabel(context, language);
  const completedRepair =
    cleanText(answers.whatCompleted) || getCompletedRepairText(context, language);
  const supportObserved =
    cleanText(answers.supportObserved) ||
    phrases.supportObserved;
  const restitution =
    cleanText(answers.restitutionCompleted) ||
    phrases.restitution;
  const progress = context.progress || peaceBond.progress || 100;

  if (language === "sw") {
    const opening =
      variant % 2 === 0
        ? `${getToneLead(tone, language)} kuwa ${person} amekamilisha njia ya marekebisho ya ${profileLabel}`
        : `${person} amekamilisha njia ya marekebisho huku maendeleo ya ${progress}% yakirekodiwa`;
    const detail = `Matendo ya marekebisho yaliyokamilika yalijumuisha ${completedRepair}`;
    const closing =
      tone === "detailed"
        ? `${supportObserved}. Wafanyakazi pia walibaini kuwa ${restitution}, jambo linalosaidia kurudi kwa jamii kwa uangalifu`
        : `${supportObserved}, na ${restitution}`;

    return trimForTone(joinSentences([opening, detail, closing]), tone);
  }

  if (language === "fr") {
    const opening =
      variant % 2 === 0
        ? `${getToneLead(tone, language)} que ${person} a termine un parcours restaurateur de ${profileLabel}`
        : `${person} a termine le parcours de reparation restauratrice avec une progression de ${progress}% enregistree`;
    const detail = `Les actions de reparation terminees comprenaient ${completedRepair}`;
    const closing =
      tone === "detailed"
        ? `${supportObserved}. Le personnel a aussi note que ${restitution}, ce qui soutient un retour prudent a la vie communautaire`
        : `${supportObserved}, et ${restitution}`;

    return trimForTone(joinSentences([opening, detail, closing]), tone);
  }

  if (language === "pt") {
    const opening =
      variant % 2 === 0
        ? `${getToneLead(tone, language)} que ${person} concluiu um caminho restaurativo de ${profileLabel}`
        : `${person} concluiu o caminho de reparacao restaurativa com ${progress}% de progresso registrado`;
    const detail = `As acoes de reparacao concluidas incluiram ${completedRepair}`;
    const closing =
      tone === "detailed"
        ? `${supportObserved}. A equipe tambem observou que ${restitution}, apoiando um retorno cuidadoso a vida comunitaria`
        : `${supportObserved}, e ${restitution}`;

    return trimForTone(joinSentences([opening, detail, closing]), tone);
  }

  if (language === "ar") {
    const opening =
      variant % 2 === 0
        ? `${getToneLead(tone, language)} أن ${person} أكمل مساراً ترميمياً في ${profileLabel}`
        : `${person} أكمل مسار الإصلاح الترميمي مع تسجيل تقدم بنسبة ${progress}%`;
    const detail = `شملت أفعال الإصلاح المكتملة ${completedRepair}`;
    const closing =
      tone === "detailed"
        ? `${supportObserved}. كما لاحظ الفريق أن ${restitution}، مما يدعم عودة حذرة إلى الحياة المجتمعية`
        : `${supportObserved}، و${restitution}`;

    return trimForTone(joinSentences([opening, detail, closing]), tone);
  }

  const opening =
    variant % 2 === 0
      ? `${getToneLead(tone, language)} that ${person} completed a ${profileLabel} restorative pathway`
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
  language = "en",
  tone = "warm",
  variant = 0,
}) {
  const peaceBond = getPeaceBond(context);
  const phrases = getDraftPhrases(language);
  const communityType = peaceBond.communityType || context.communityType || phrases.defaultCommunity;
  const response =
    cleanText(answers.communityResponse) ||
    (language === "sw"
      ? "wawakilishi wa jamii walitambua juhudi zinazoonekana kuelekea marekebisho"
      : language === "fr"
        ? "les representants communautaires ont reconnu un effort visible vers la reparation"
        : language === "pt"
          ? "representantes comunitarios reconheceram esforco visivel em direcao a reparacao"
          : language === "ar"
            ? "اعترف ممثلو المجتمع بجهد واضح نحو الإصلاح"
            : "community representatives acknowledged visible effort toward repair");
  const concerns =
    cleanText(answers.remainingConcerns) ||
    (language === "sw"
      ? "ushiriki wa amani unaoendelea na mawasiliano ya ufuatiliaji na mpatanishi"
      : language === "fr"
        ? "une participation pacifique continue et un suivi du mediateur"
        : language === "pt"
          ? "participacao pacifica continua e acompanhamento do mediador"
          : language === "ar"
            ? "مشاركة سلمية مستمرة ومتابعة مع الوسيط"
            : "continued peaceful participation and follow-up mediator contact");
  const welcome =
    cleanText(answers.welcomeSignals) ||
    (language === "sw"
      ? "msaada wa urejeshwaji unaoendelea na ushirikishwaji wa heshima"
      : language === "fr"
        ? "un soutien a la reintegration continue et a l'inclusion respectueuse"
        : language === "pt"
          ? "apoio a reintegracao continua e inclusao respeitosa"
          : language === "ar"
            ? "دعماً لاستمرار إعادة الإدماج والشمول باحترام"
            : "support for continued reintegration and respectful inclusion");

  if (language === "sw") {
    const opening =
      variant % 2 === 0
        ? `Wawakilishi kutoka ${communityType} waliripoti mwitikio wa kujenga kwa njia ya marekebisho`
        : `Wanajamii wa ${communityType} walitambua njia ya marekebisho kwa uangalifu`;
    const closing =
      tone === "brief"
        ? `Jamii ilibaini ${welcome}`
        : `Uangalizi uliobaki unapaswa kuzingatia ${concerns}, huku jamii ikibaini ${welcome}`;

    return trimForTone(joinSentences([opening, response, closing]), tone);
  }

  if (language === "fr") {
    const opening =
      variant % 2 === 0
        ? `Les representants de ${communityType} ont signale une reponse constructive au parcours de reparation`
        : `Les membres de ${communityType} ont reconnu le parcours de reparation avec soin`;
    const closing =
      tone === "brief"
        ? `La communaute a note ${welcome}`
        : `L'attention restante devrait porter sur ${concerns}, tandis que la communaute a note ${welcome}`;

    return trimForTone(joinSentences([opening, response, closing]), tone);
  }

  if (language === "pt") {
    const opening =
      variant % 2 === 0
        ? `Representantes de ${communityType} relataram uma resposta construtiva ao caminho de reparacao`
        : `Membros de ${communityType} reconheceram o caminho de reparacao com cuidado`;
    const closing =
      tone === "brief"
        ? `A comunidade observou ${welcome}`
        : `A atencao restante deve focar em ${concerns}, enquanto a comunidade observou ${welcome}`;

    return trimForTone(joinSentences([opening, response, closing]), tone);
  }

  if (language === "ar") {
    const opening =
      variant % 2 === 0
        ? `أبلغ ممثلو ${communityType} عن استجابة بناءة لمسار الإصلاح`
        : `اعترف أعضاء ${communityType} بمسار الإصلاح بعناية`;
    const closing =
      tone === "brief"
        ? `لاحظ المجتمع ${welcome}`
        : `ينبغي أن يركز الاهتمام المتبقي على ${concerns}، بينما لاحظ المجتمع ${welcome}`;

    return trimForTone(joinSentences([opening, response, closing]), tone);
  }

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
  language = "en",
  tone = "warm",
  variant = 0,
}) {
  const person = getPersonLabel(context, language);
  const profile = getCategoryProfile(context, answers);
  const profileLabel = getProfileText(profile, language, "label");
  const support =
    cleanText(answers.supportRecommended) ||
    (language === "sw"
      ? "msaada endelevu wa urejeshwaji na ushirikishwaji wa jamii"
      : language === "fr"
        ? "un soutien continu a la reintegration et a l'inclusion communautaire"
        : language === "pt"
          ? "apoio continuo a reintegracao e inclusao comunitaria"
          : language === "ar"
            ? "دعماً مستمراً لإعادة الإدماج والشمول المجتمعي"
            : "continued reintegration support and community inclusion");
  const followUp =
    cleanText(answers.followUp) ||
    (language === "sw"
      ? "ufuatiliaji mwepesi na mpatanishi"
      : language === "fr"
        ? "de legeres visites de suivi avec le mediateur"
        : language === "pt"
          ? "acompanhamentos leves com o mediador"
          : language === "ar"
            ? "متابعات خفيفة مع الوسيط"
            : "light follow-up check-ins with the mediator");
  const readiness =
    cleanText(answers.inclusionReadiness) ||
    (language === "sw"
      ? "matendo ya marekebisho yaliyokamilika na utambuzi wa jamii"
      : language === "fr"
        ? "les actions de reparation terminees et la reconnaissance communautaire"
        : language === "pt"
          ? "as acoes de reparacao concluidas e o reconhecimento comunitario"
          : language === "ar"
            ? "أفعال الإصلاح المكتملة واعتراف المجتمع"
            : "the completed repair actions and community acknowledgment");
  const grantText = getGrantText(context, language);

  if (language === "sw") {
    const opening =
      variant % 2 === 0
        ? `Kutokana na ${readiness}, wafanyakazi wa PeaceBond wanapendekeza ${support} kwa ${person}`
        : `Wafanyakazi wa PeaceBond wanapendekeza ${person} aendelee kupokea ${support}`;
    const detail =
      tone === "formal"
        ? `Pendekezo hili linafuata kukamilika kwa njia ya ${profileLabel} na msaada wa ruzuku uliorekodiwa wa ${grantText}`
        : `Pendekezo hili linatokana na njia ya ${profileLabel}, ${grantText}, na heshima ya kurudi kwa amani`;
    const closing = `Wafanyakazi pia wanapendekeza ${followUp} ili maendeleo yaendelee kuwa thabiti baada ya cheti kutolewa`;

    return trimForTone(joinSentences([opening, detail, closing]), tone);
  }

  if (language === "fr") {
    const opening =
      variant % 2 === 0
        ? `Sur la base de ${readiness}, le personnel PeaceBond recommande ${support} pour ${person}`
        : `Le personnel PeaceBond recommande que ${person} continue de recevoir ${support}`;
    const detail =
      tone === "formal"
        ? `Cette recommandation suit l'achevement du parcours de ${profileLabel} et le soutien de subvention enregistre de ${grantText}`
        : `La recommandation s'appuie sur le parcours de ${profileLabel}, ${grantText}, et la dignite d'un retour pacifique`;
    const closing = `Le personnel recommande aussi ${followUp} afin que les progres restent stables apres la liberation du certificat`;

    return trimForTone(joinSentences([opening, detail, closing]), tone);
  }

  if (language === "pt") {
    const opening =
      variant % 2 === 0
        ? `Com base em ${readiness}, a equipe PeaceBond recomenda ${support} para ${person}`
        : `A equipe PeaceBond recomenda que ${person} continue recebendo ${support}`;
    const detail =
      tone === "formal"
        ? `Esta recomendacao segue a conclusao do caminho de ${profileLabel} e o apoio de subvencao registrado de ${grantText}`
        : `A recomendacao se baseia no caminho de ${profileLabel}, ${grantText}, e na dignidade de um retorno pacifico`;
    const closing = `A equipe tambem recomenda ${followUp} para que o progresso permaneça estavel apos a liberacao do certificado`;

    return trimForTone(joinSentences([opening, detail, closing]), tone);
  }

  if (language === "ar") {
    const opening =
      variant % 2 === 0
        ? `بناءً على ${readiness}، يوصي فريق PeaceBond بـ ${support} لـ ${person}`
        : `يوصي فريق PeaceBond بأن يستمر ${person} في تلقي ${support}`;
    const detail =
      tone === "formal"
        ? `تأتي هذه التوصية بعد إكمال مسار ${profileLabel} ودعم المنحة المسجل ${grantText}`
        : `تستند التوصية إلى مسار ${profileLabel}، و${grantText}، وكرامة العودة السلمية`;
    const closing = `كما يوصي الفريق بـ ${followUp} حتى يبقى التقدم ثابتاً بعد إصدار الشهادة`;

    return trimForTone(joinSentences([opening, detail, closing]), tone);
  }

  const opening =
    variant % 2 === 0
      ? `Based on ${readiness}, PeaceBond staff recommend ${support} for ${person}`
      : `PeaceBond staff recommend that ${person} continue receiving ${support}`;
  const detail =
    tone === "formal"
      ? `This recommendation follows completion of the ${profileLabel} pathway and the recorded grant support of ${grantText}`
      : `The recommendation is grounded in the ${profileLabel} pathway, ${grantText}, and the dignity of a peaceful return`;
  const closing = `Staff also recommend ${followUp} so progress remains steady after certificate release`;

  return trimForTone(joinSentences([opening, detail, closing]), tone);
}

export function generateGuidedDraft({ answers, context, fieldType, language, tone, variant }) {
  if (fieldType === "harmDescription") {
    return generateHarmDraft({ answers, context, language, tone, variant });
  }

  if (fieldType === "completionReview") {
    return generateCompletionReviewDraft({ answers, context, language, tone, variant });
  }

  if (fieldType === "communityAcknowledgment") {
    return generateCommunityAcknowledgmentDraft({ answers, context, language, tone, variant });
  }

  if (fieldType === "staffRecommendation") {
    return generateStaffRecommendationDraft({ answers, context, language, tone, variant });
  }

  return "";
}
