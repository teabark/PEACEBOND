import { translateWithFallback } from "./i18n.js";

const supportedLanguages = ["en", "sw", "fr", "pt", "ar"];

const categoryContent = {
  en: {
    theft_livestock: {
      title: "Livestock Theft Repair Pathway",
      label: "livestock theft",
      focus: "restitution, household repair, and mediated reconciliation",
      ritual:
        "A restitution gathering where the affected household receives the repair commitment with trusted witnesses.",
    },
    destruction_property: {
      title: "Property Repair Pathway",
      label: "property damage",
      focus: "repair work, material replacement, and restored community safety",
      ritual:
        "A rebuilding day that closes with community acknowledgment of restored safety and shared responsibility.",
    },
    militia_armed: {
      title: "Armed Group Reintegration Pathway",
      label: "armed group involvement",
      focus: "accountability testimony, supervised service, and peaceful role formation",
      ritual:
        "A community witnessing circle where testimony is heard and a peaceful role is affirmed.",
    },
    violence_fighting: {
      title: "Violence Repair Pathway",
      label: "violence or fighting",
      focus: "apology, safety commitments, and peace circle repair",
      ritual:
        "A peace circle where safety commitments and repair actions are spoken aloud with care.",
    },
    verbal_threats: {
      title: "Respectful Communication Repair Pathway",
      label: "verbal threats",
      focus: "apology, mediation, and respectful communication",
      ritual:
        "A mediation meeting where harmful words are replaced with public commitments to respect.",
    },
    land_dispute: {
      title: "Land Dispute Reconciliation Pathway",
      label: "land dispute",
      focus: "boundary mediation, dialogue, and shared agreement",
      ritual: "A boundary walk where agreed markers are recognized by both families or groups.",
    },
    general_harm: {
      title: "Community Repair Pathway",
      label: "general community harm",
      focus: "listening, practical repair, and mediated return",
      ritual: "A quiet reconciliation meeting where repair commitments are witnessed.",
    },
  },
  sw: {
    theft_livestock: {
      title: "Njia ya Marekebisho ya Wizi wa Mifugo",
      label: "wizi wa mifugo",
      focus: "fidia, marekebisho ya kaya, na upatanisho wa kusimamiwa",
      ritual: "Mkutano wa fidia ambapo kaya iliyoathiriwa inapokea ahadi ya marekebisho mbele ya mashahidi wa kuaminika.",
    },
    destruction_property: {
      title: "Njia ya Marekebisho ya Mali",
      label: "uharibifu wa mali",
      focus: "kazi ya kurekebisha, kubadilisha vifaa, na kurejesha usalama wa jamii",
      ritual: "Siku ya kujenga upya inayofungwa kwa utambuzi wa jamii kuhusu usalama uliorejeshwa na wajibu wa pamoja.",
    },
    militia_armed: {
      title: "Njia ya Urejeshwaji kutoka Kundi Lenye Silaha",
      label: "ushiriki wa kundi lenye silaha",
      focus: "ushahidi wa uwajibikaji, huduma inayosimamiwa, na kuunda nafasi ya amani",
      ritual: "Duara la ushuhuda wa jamii ambapo ushahidi unasikilizwa na nafasi ya amani inathibitishwa.",
    },
    violence_fighting: {
      title: "Njia ya Marekebisho Baada ya Vurugu",
      label: "vurugu au mapigano",
      focus: "kuomba radhi, ahadi za usalama, na marekebisho kupitia duara la amani",
      ritual: "Duara la amani ambapo ahadi za usalama na matendo ya marekebisho yanasemwa kwa uangalifu.",
    },
    verbal_threats: {
      title: "Njia ya Marekebisho ya Mawasiliano ya Heshima",
      label: "vitisho vya maneno",
      focus: "kuomba radhi, upatanisho, na mawasiliano ya heshima",
      ritual: "Mkutano wa upatanisho ambapo maneno ya madhara hubadilishwa na ahadi za wazi za heshima.",
    },
    land_dispute: {
      title: "Njia ya Upatanisho wa Mgogoro wa Ardhi",
      label: "mgogoro wa ardhi",
      focus: "upatanishi wa mipaka, mazungumzo, na makubaliano ya pamoja",
      ritual: "Matembezi ya mipaka ambapo alama zilizokubaliwa zinatambuliwa na familia au makundi yote mawili.",
    },
    general_harm: {
      title: "Njia ya Marekebisho ya Jamii",
      label: "madhara ya jumla kwa jamii",
      focus: "kusikiliza, marekebisho ya vitendo, na kurudi kwa upatanisho",
      ritual: "Mkutano tulivu wa upatanisho ambapo ahadi za marekebisho hushuhudiwa.",
    },
  },
  fr: {
    theft_livestock: {
      title: "Parcours de Reparation pour Vol de Betail",
      label: "vol de betail",
      focus: "restitution, reparation du foyer et reconciliation mediee",
      ritual: "Un rassemblement de restitution ou le foyer affecte recoit l'engagement de reparation devant des temoins de confiance.",
    },
    destruction_property: {
      title: "Parcours de Reparation des Biens",
      label: "dommages materiels",
      focus: "travail de reparation, remplacement materiel et securite communautaire restauree",
      ritual: "Une journee de reconstruction qui se termine par une reconnaissance communautaire de la securite restauree et de la responsabilite partagee.",
    },
    militia_armed: {
      title: "Parcours de Reintegration Apres Groupe Arme",
      label: "implication dans un groupe arme",
      focus: "temoignage de responsabilite, service supervise et formation d'un role pacifique",
      ritual: "Un cercle de temoignage communautaire ou la parole est entendue et un role pacifique est affirme.",
    },
    violence_fighting: {
      title: "Parcours de Reparation Apres Violence",
      label: "violence ou bagarre",
      focus: "excuses, engagements de securite et cercle de paix reparateur",
      ritual: "Un cercle de paix ou les engagements de securite et les actions de reparation sont exprimes avec soin.",
    },
    verbal_threats: {
      title: "Parcours de Reparation de Communication Respectueuse",
      label: "menaces verbales",
      focus: "excuses, mediation et communication respectueuse",
      ritual: "Une reunion de mediation ou les paroles nuisibles sont remplacees par des engagements publics de respect.",
    },
    land_dispute: {
      title: "Parcours de Reconciliation Fonciere",
      label: "conflit foncier",
      focus: "mediation des limites, dialogue et accord partage",
      ritual: "Une marche des limites ou les reperes convenus sont reconnus par les deux familles ou groupes.",
    },
    general_harm: {
      title: "Parcours de Reparation Communautaire",
      label: "prejudice communautaire general",
      focus: "ecoute, reparation pratique et retour medie",
      ritual: "Une reunion de reconciliation calme ou les engagements de reparation sont attestes.",
    },
  },
  pt: {
    theft_livestock: {
      title: "Caminho de Reparacao por Roubo de Gado",
      label: "roubo de gado",
      focus: "restituicao, reparacao familiar e reconciliacao mediada",
      ritual: "Um encontro de restituicao em que a familia afetada recebe o compromisso de reparacao com testemunhas de confianca.",
    },
    destruction_property: {
      title: "Caminho de Reparacao de Propriedade",
      label: "dano a propriedade",
      focus: "trabalho de reparacao, reposicao de materiais e seguranca comunitaria restaurada",
      ritual: "Um dia de reconstrucao encerrado com reconhecimento comunitario da seguranca restaurada e da responsabilidade partilhada.",
    },
    militia_armed: {
      title: "Caminho de Reintegracao Apos Grupo Armado",
      label: "envolvimento com grupo armado",
      focus: "testemunho de responsabilidade, servico supervisionado e formacao de papel pacifico",
      ritual: "Um circulo de testemunho comunitario em que o relato e ouvido e um papel pacifico e afirmado.",
    },
    violence_fighting: {
      title: "Caminho de Reparacao Apos Violencia",
      label: "violencia ou briga",
      focus: "pedido de desculpas, compromissos de seguranca e circulo de paz",
      ritual: "Um circulo de paz onde compromissos de seguranca e acoes de reparacao sao falados com cuidado.",
    },
    verbal_threats: {
      title: "Caminho de Comunicacao Respeitosa",
      label: "ameacas verbais",
      focus: "pedido de desculpas, mediacao e comunicacao respeitosa",
      ritual: "Uma reuniao de mediacao em que palavras nocivas sao substituidas por compromissos publicos de respeito.",
    },
    land_dispute: {
      title: "Caminho de Reconciliacao de Disputa de Terra",
      label: "disputa de terra",
      focus: "mediacao de limites, dialogo e acordo partilhado",
      ritual: "Uma caminhada de limites onde marcos acordados sao reconhecidos pelas familias ou grupos.",
    },
    general_harm: {
      title: "Caminho de Reparacao Comunitaria",
      label: "dano comunitario geral",
      focus: "escuta, reparacao pratica e retorno mediado",
      ritual: "Uma reuniao tranquila de reconciliacao onde compromissos de reparacao sao testemunhados.",
    },
  },
  ar: {
    theft_livestock: {
      title: "مسار إصلاح سرقة المواشي",
      label: "سرقة المواشي",
      focus: "رد الحق، إصلاح العلاقة مع الأسرة، ومصالحة بوساطة",
      ritual: "لقاء رد حق تتسلم فيه الأسرة المتضررة التزام الإصلاح بحضور شهود موثوقين.",
    },
    destruction_property: {
      title: "مسار إصلاح الممتلكات",
      label: "إتلاف الممتلكات",
      focus: "عمل إصلاحي، تعويض المواد، واستعادة أمان المجتمع",
      ritual: "يوم إعادة بناء يُختتم باعتراف مجتمعي بالأمان المستعاد والمسؤولية المشتركة.",
    },
    militia_armed: {
      title: "مسار إعادة الإدماج بعد جماعة مسلحة",
      label: "الارتباط بجماعة مسلحة",
      focus: "شهادة مسؤولية، خدمة بإشراف، وتكوين دور سلمي",
      ritual: "دائرة شهادة مجتمعية يُسمع فيها الاعتراف ويُثبت فيها دور سلمي.",
    },
    violence_fighting: {
      title: "مسار إصلاح بعد العنف",
      label: "العنف أو الشجار",
      focus: "اعتذار، التزامات سلامة، وإصلاح عبر دائرة سلام",
      ritual: "دائرة سلام تُقال فيها التزامات السلامة وأفعال الإصلاح بعناية.",
    },
    verbal_threats: {
      title: "مسار إصلاح التواصل المحترم",
      label: "تهديدات لفظية",
      focus: "اعتذار، وساطة، وتواصل محترم",
      ritual: "جلسة وساطة تُستبدل فيها الكلمات المؤذية بالتزامات علنية بالاحترام.",
    },
    land_dispute: {
      title: "مسار مصالحة نزاع أرض",
      label: "نزاع أرض",
      focus: "وساطة حدود، حوار، واتفاق مشترك",
      ritual: "مسير حدودي تُعترف فيه العلامات المتفق عليها من العائلتين أو المجموعتين.",
    },
    general_harm: {
      title: "مسار إصلاح مجتمعي",
      label: "ضرر مجتمعي عام",
      focus: "استماع، إصلاح عملي، وعودة بوساطة",
      ritual: "لقاء مصالحة هادئ تُشهد فيه التزامات الإصلاح.",
    },
  },
};

const actionPatterns = {
  en: {
    low: [
      "Meet with a mediator to name the {{label}} harm and identify who was affected.",
      "Offer a respectful apology or restitution step connected to {{focus}}.",
      "Complete one short practical repair task witnessed by a community representative.",
    ],
    moderate: [
      "Create a mediated repair agreement focused on {{focus}}.",
      "Complete supervised repair work that responds directly to the {{label}} harm.",
      "Attend a peace circle where affected people review the repair work and confirm next steps.",
    ],
    high: [
      "Give a formal accountability statement before mediators and trusted community representatives.",
      "Complete an extended supervised repair plan focused on {{focus}} with documented check-ins.",
      "Support a reintegration activity that helps prevent future {{label}} harm and strengthens peaceful return.",
    ],
  },
  sw: {
    low: [
      "Kutana na mpatanishi kutaja madhara ya {{label}} na kubaini walioathiriwa.",
      "Toa ombi la radhi au hatua ya fidia inayohusiana na {{focus}}.",
      "Kamilisha tendo fupi la marekebisho linaloshuhudiwa na mwakilishi wa jamii.",
    ],
    moderate: [
      "Tengeneza makubaliano ya marekebisho yanayosimamiwa kuhusu {{focus}}.",
      "Kamilisha kazi ya marekebisho inayosimamiwa inayojibu moja kwa moja madhara ya {{label}}.",
      "Hudhuria duara la amani ambapo walioathiriwa hupitia marekebisho na kuthibitisha hatua zinazofuata.",
    ],
    high: [
      "Toa tamko rasmi la uwajibikaji mbele ya wapatanishi na wawakilishi wa jamii wanaoaminika.",
      "Kamilisha mpango mrefu wa marekebisho uliosimamiwa kuhusu {{focus}} pamoja na ufuatiliaji uliorekodiwa.",
      "Saidia shughuli ya urejeshwaji inayozuia madhara ya {{label}} kujirudia na kuimarisha kurudi kwa amani.",
    ],
  },
  fr: {
    low: [
      "Rencontrer un mediateur pour nommer le prejudice lie a {{label}} et identifier les personnes affectees.",
      "Presenter des excuses respectueuses ou une etape de restitution liee a {{focus}}.",
      "Terminer une courte tache de reparation pratique attestee par un representant communautaire.",
    ],
    moderate: [
      "Creer un accord de reparation medie centre sur {{focus}}.",
      "Terminer un travail de reparation supervise qui repond directement au prejudice de {{label}}.",
      "Participer a un cercle de paix ou les personnes affectees examinent la reparation et confirment les prochaines etapes.",
    ],
    high: [
      "Faire une declaration formelle de responsabilite devant les mediateurs et des representants communautaires de confiance.",
      "Terminer un plan de reparation supervise prolonge centre sur {{focus}} avec des suivis documentes.",
      "Soutenir une activite de reintegration qui aide a prevenir de futurs prejudices de {{label}} et renforce un retour pacifique.",
    ],
  },
  pt: {
    low: [
      "Encontrar-se com um mediador para nomear o dano de {{label}} e identificar quem foi afetado.",
      "Oferecer um pedido de desculpas respeitoso ou uma etapa de restituicao ligada a {{focus}}.",
      "Concluir uma pequena tarefa pratica de reparacao testemunhada por um representante comunitario.",
    ],
    moderate: [
      "Criar um acordo de reparacao mediado com foco em {{focus}}.",
      "Concluir trabalho de reparacao supervisionado que responda diretamente ao dano de {{label}}.",
      "Participar de um circulo de paz onde as pessoas afetadas revisam a reparacao e confirmam os proximos passos.",
    ],
    high: [
      "Fazer uma declaracao formal de responsabilidade diante de mediadores e representantes comunitarios de confianca.",
      "Concluir um plano prolongado de reparacao supervisionada com foco em {{focus}} e verificacoes documentadas.",
      "Apoiar uma atividade de reintegracao que ajude a prevenir novo dano de {{label}} e fortaleça um retorno pacifico.",
    ],
  },
  ar: {
    low: [
      "اجتمع مع وسيط لتسمية ضرر {{label}} وتحديد من تأثر به.",
      "قدم اعتذاراً محترماً أو خطوة رد حق مرتبطة بـ {{focus}}.",
      "أكمل مهمة إصلاح عملية قصيرة يشهدها ممثل من المجتمع.",
    ],
    moderate: [
      "ضع اتفاق إصلاح بوساطة يركز على {{focus}}.",
      "أكمل عملاً إصلاحياً بإشراف يستجيب مباشرة لضرر {{label}}.",
      "احضر دائرة سلام يراجع فيها المتضررون الإصلاح ويؤكدون الخطوات التالية.",
    ],
    high: [
      "قدم بيان مسؤولية رسمي أمام الوسطاء وممثلين موثوقين من المجتمع.",
      "أكمل خطة إصلاح ممتدة بإشراف تركز على {{focus}} مع متابعات موثقة.",
      "ادعم نشاط إعادة إدماج يساعد على منع تكرار ضرر {{label}} ويقوي العودة السلمية.",
    ],
  },
};

const explanationTemplates = {
  en: "This PeaceBond was generated from a {{label}} case with {{severity}} severity. The plan focuses on {{focus}}. Severity determines the depth of repair and support, not punishment.",
  sw: "PeaceBond hii imetengenezwa kutoka kesi ya {{label}} yenye uzito wa {{severity}}. Mpango unazingatia {{focus}}. Uzito huamua kina cha marekebisho na msaada, si adhabu.",
  fr: "Ce PeaceBond a ete genere a partir d'un cas de {{label}} de gravite {{severity}}. Le plan se concentre sur {{focus}}. La gravite determine la profondeur de la reparation et du soutien, non la punition.",
  pt: "Este PeaceBond foi gerado a partir de um caso de {{label}} com gravidade {{severity}}. O plano se concentra em {{focus}}. A gravidade determina a profundidade da reparacao e do apoio, nao a punicao.",
  ar: "تم إنشاء هذا PeaceBond من حالة {{label}} بدرجة خطورة {{severity}}. تركز الخطة على {{focus}}. تحدد الخطورة عمق الإصلاح والدعم، لا العقاب.",
};

const communityTypes = {
  "Border community": {
    ar: "مجتمع حدودي",
    en: "Border community",
    fr: "Communaute frontaliere",
    pt: "Comunidade fronteirica",
    sw: "Jamii ya mpakani",
  },
  "Coastal fishing community": {
    ar: "مجتمع صيد ساحلي",
    en: "Coastal fishing community",
    fr: "Communaute de peche cotiere",
    pt: "Comunidade pesqueira costeira",
    sw: "Jamii ya uvuvi ya pwani",
  },
  "General community": {
    ar: "مجتمع عام",
    en: "General community",
    fr: "Communaute generale",
    pt: "Comunidade geral",
    sw: "Jamii ya jumla",
  },
  "Market town": {
    ar: "بلدة سوقية",
    en: "Market town",
    fr: "Ville de marche",
    pt: "Cidade de mercado",
    sw: "Mji wa soko",
  },
  "Pastoral community": {
    ar: "مجتمع رعوي",
    en: "Pastoral community",
    fr: "Communaute pastorale",
    pt: "Comunidade pastoril",
    sw: "Jamii ya wafugaji",
  },
  "Refugee settlement": {
    ar: "مستوطنة لاجئين",
    en: "Refugee settlement",
    fr: "Site de refugies",
    pt: "Assentamento de refugiados",
    sw: "Makazi ya wakimbizi",
  },
  "Rural village": {
    ar: "قرية ريفية",
    en: "Rural village",
    fr: "Village rural",
    pt: "Aldeia rural",
    sw: "Kijiji cha vijijini",
  },
  "Urban settlement": {
    ar: "تجمع حضري",
    en: "Urban settlement",
    fr: "Quartier urbain",
    pt: "Assentamento urbano",
    sw: "Makazi ya mjini",
  },
};

const grantPurposeByCategory = {
  theft_livestock: {
    ar: "دعم إعادة الإدماج لمواد رد الحق واستقرار سبل العيش.",
    en: "Reintegration support for restitution materials and livelihood stability.",
    fr: "Soutien a la reintegration pour les materiaux de restitution et la stabilite des moyens de subsistance.",
    pt: "Apoio de reintegracao para materiais de restituicao e estabilidade dos meios de vida.",
    sw: "Msaada wa urejeshwaji kwa vifaa vya fidia na uthabiti wa riziki.",
  },
  destruction_property: {
    ar: "دعم إعادة الإدماج لمستلزمات الإصلاح والنقل الآمن.",
    en: "Reintegration support for repair supplies and safe transport.",
    fr: "Soutien a la reintegration pour les fournitures de reparation et le transport sur.",
    pt: "Apoio de reintegracao para materiais de reparacao e transporte seguro.",
    sw: "Msaada wa urejeshwaji kwa vifaa vya marekebisho na usafiri salama.",
  },
  militia_armed: {
    ar: "دعم إعادة الإدماج للتدريب السلمي والمتابعة المجتمعية.",
    en: "Reintegration support for peaceful livelihood training and community follow-up.",
    fr: "Soutien a la reintegration pour une formation pacifique aux moyens de subsistance et le suivi communautaire.",
    pt: "Apoio de reintegracao para formacao pacifica de meios de vida e acompanhamento comunitario.",
    sw: "Msaada wa urejeshwaji kwa mafunzo ya riziki ya amani na ufuatiliaji wa jamii.",
  },
  violence_fighting: {
    ar: "دعم إعادة الإدماج للمتابعة الآمنة وإصلاح الثقة.",
    en: "Reintegration support for safe follow-up and trust repair.",
    fr: "Soutien a la reintegration pour un suivi sur et la reparation de la confiance.",
    pt: "Apoio de reintegracao para acompanhamento seguro e reparacao da confianca.",
    sw: "Msaada wa urejeshwaji kwa ufuatiliaji salama na kurekebisha uaminifu.",
  },
  verbal_threats: {
    ar: "دعم للوساطة والمتابعة والعودة المحترمة.",
    en: "Support for mediation, follow-up, and respectful return.",
    fr: "Soutien a la mediation, au suivi et au retour respectueux.",
    pt: "Apoio para mediacao, acompanhamento e retorno respeitoso.",
    sw: "Msaada kwa upatanisho, ufuatiliaji, na kurudi kwa heshima.",
  },
  land_dispute: {
    ar: "دعم لمواد تحديد الحدود والنقل إلى جلسات الوساطة.",
    en: "Support for boundary marker materials and transport to mediation meetings.",
    fr: "Soutien pour les materiaux de bornage et le transport vers les reunions de mediation.",
    pt: "Apoio para materiais de marcacao de limites e transporte para reunioes de mediacao.",
    sw: "Msaada kwa vifaa vya alama za mipaka na usafiri kwenda vikao vya upatanisho.",
  },
  general_harm: {
    ar: "دعم أولي لإعادة الإدماج من أجل عودة مستقرة وسلمية.",
    en: "Reintegration starter support for a stable peaceful return.",
    fr: "Soutien initial a la reintegration pour un retour stable et pacifique.",
    pt: "Apoio inicial de reintegracao para um retorno estavel e pacifico.",
    sw: "Msaada wa mwanzo wa urejeshwaji kwa kurudi kwa amani na uthabiti.",
  },
};

function normalizeLanguage(language) {
  return supportedLanguages.includes(language) ? language : "en";
}

function normalizeSeverity(severity) {
  return ["low", "moderate", "high"].includes(severity) ? severity : "moderate";
}

function fillTemplate(template, values) {
  return Object.entries(values).reduce(
    (text, [key, value]) => text.replaceAll(`{{${key}}}`, String(value)),
    template
  );
}

export function getCategoryContent(category, language) {
  const nextLanguage = normalizeLanguage(language);
  return (
    categoryContent[nextLanguage]?.[category] ||
    categoryContent.en[category] ||
    categoryContent[nextLanguage].general_harm ||
    categoryContent.en.general_harm
  );
}

export function translateSeverity(severity, language) {
  const nextSeverity = normalizeSeverity(severity);
  return translateWithFallback(normalizeLanguage(language), `severity.${nextSeverity}`);
}

export function translateCommunityType(communityType, language) {
  const nextLanguage = normalizeLanguage(language);
  return communityTypes[communityType]?.[nextLanguage] || communityType || communityTypes["General community"][nextLanguage];
}

export function translateCategory(category, language) {
  return getCategoryContent(category, language).label;
}

export function translateCaseTitle(peaceBond, language) {
  return getCategoryContent(peaceBond?.category, language).title || peaceBond?.caseTitle || "";
}

export function translateRepairActions(peaceBond, language) {
  const nextLanguage = normalizeLanguage(language);
  const category = peaceBond?.category;
  const severity = normalizeSeverity(peaceBond?.severity);

  if (!categoryContent[nextLanguage]?.[category]) {
    return Array.isArray(peaceBond?.repairActions) ? peaceBond.repairActions : [];
  }

  const content = getCategoryContent(category, nextLanguage);
  return actionPatterns[nextLanguage][severity].map((action) =>
    fillTemplate(action, {
      focus: content.focus,
      label: content.label,
    })
  );
}

export function translateRitual(peaceBond, language) {
  return getCategoryContent(peaceBond?.category, language).ritual || peaceBond?.ritual || "";
}

export function translateGrantPurpose(peaceBond, language) {
  const nextLanguage = normalizeLanguage(language);
  return (
    grantPurposeByCategory[peaceBond?.category]?.[nextLanguage] ||
    peaceBond?.grant?.purpose ||
    peaceBond?.grantPurpose ||
    grantPurposeByCategory.general_harm[nextLanguage]
  );
}

export function translatePlanExplanation(peaceBond, language) {
  const nextLanguage = normalizeLanguage(language);
  const content = getCategoryContent(peaceBond?.category, nextLanguage);

  return fillTemplate(explanationTemplates[nextLanguage], {
    focus: content.focus,
    label: content.label,
    severity: translateSeverity(peaceBond?.severity, nextLanguage),
  });
}

export function getLocalizedPeaceBond(peaceBond, language) {
  if (!peaceBond) {
    return null;
  }

  const grantPurpose = translateGrantPurpose(peaceBond, language);

  return {
    ...peaceBond,
    caseTitle: translateCaseTitle(peaceBond, language),
    communityTypeLabel: translateCommunityType(peaceBond.communityType, language),
    explanation: translatePlanExplanation(peaceBond, language),
    grantPurpose,
    repairActions: translateRepairActions(peaceBond, language),
    ritual: translateRitual(peaceBond, language),
    severityLabel: translateSeverity(peaceBond.severity, language),
    grant: {
      ...peaceBond.grant,
      purpose: grantPurpose,
    },
  };
}
