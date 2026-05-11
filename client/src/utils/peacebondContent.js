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

const adaptiveCategoryContent = {
  en: {
    resource_theft: {
      title: "Resource Theft Repair Pathway",
      label: "resource theft",
      focus: "restitution, shared resource access, and mediated accountability",
      ritual: "A resource repair meeting where affected households confirm restitution and renewed access commitments.",
    },
    livelihood_disruption: {
      title: "Livelihood Restoration Pathway",
      label: "livelihood disruption",
      focus: "restoring tools, work access, and community trust around daily livelihood",
      ritual: "A livelihood restoration circle where work access, repair tasks, and support are acknowledged.",
    },
    displacement_impact: {
      title: "Displacement-Aware Repair Pathway",
      label: "community displacement impact",
      focus: "safe return, shared shelter or service access, and careful community mediation",
      ritual: "A careful welcome meeting where repair commitments are witnessed without exposing vulnerable households.",
    },
  },
  sw: {
    resource_theft: {
      title: "Njia ya Marekebisho ya Wizi wa Rasilimali",
      label: "wizi wa rasilimali",
      focus: "fidia, upatikanaji wa rasilimali za pamoja, na uwajibikaji kupitia upatanisho",
      ritual: "Mkutano wa kurekebisha rasilimali ambapo kaya zilizoathiriwa zinathibitisha fidia na ahadi za upatikanaji.",
    },
    livelihood_disruption: {
      title: "Njia ya Kurejesha Riziki",
      label: "kuvurugika kwa riziki",
      focus: "kurejesha zana, upatikanaji wa kazi, na uaminifu wa jamii kuhusu riziki ya kila siku",
      ritual: "Duara la kurejesha riziki ambapo upatikanaji wa kazi, matendo ya marekebisho, na msaada hutambuliwa.",
    },
    displacement_impact: {
      title: "Njia ya Marekebisho kwa Mazingira ya Uhamisho",
      label: "athari ya uhamisho wa jamii",
      focus: "kurudi salama, upatikanaji wa makazi au huduma za pamoja, na upatanisho makini",
      ritual: "Mkutano wa makaribisho wa uangalifu ambapo ahadi za marekebisho hushuhudiwa bila kufichua kaya zilizo hatarini.",
    },
  },
  fr: {
    resource_theft: {
      title: "Parcours de Reparation pour Vol de Ressources",
      label: "vol de ressources",
      focus: "restitution, acces aux ressources partagees et responsabilite mediee",
      ritual: "Une rencontre de reparation des ressources ou les foyers affectes confirment la restitution et les engagements d'acces.",
    },
    livelihood_disruption: {
      title: "Parcours de Restauration des Moyens de Subsistance",
      label: "perturbation des moyens de subsistance",
      focus: "restaurer les outils, l'acces au travail et la confiance communautaire autour du quotidien",
      ritual: "Un cercle de restauration des moyens de subsistance ou l'acces au travail, les reparations et le soutien sont reconnus.",
    },
    displacement_impact: {
      title: "Parcours de Reparation Sensible au Deplacement",
      label: "impact du deplacement communautaire",
      focus: "retour sur, acces partage aux abris ou services, et mediation communautaire prudente",
      ritual: "Une rencontre d'accueil prudente ou les engagements de reparation sont attestes sans exposer les foyers vulnerables.",
    },
  },
  pt: {
    resource_theft: {
      title: "Caminho de Reparacao por Roubo de Recursos",
      label: "roubo de recursos",
      focus: "restituicao, acesso a recursos partilhados e responsabilidade mediada",
      ritual: "Uma reuniao de reparacao de recursos onde familias afetadas confirmam restituicao e compromissos de acesso.",
    },
    livelihood_disruption: {
      title: "Caminho de Restauracao de Meios de Vida",
      label: "interrupcao dos meios de vida",
      focus: "restaurar ferramentas, acesso ao trabalho e confianca comunitaria no sustento diario",
      ritual: "Um circulo de restauracao dos meios de vida onde acesso ao trabalho, reparos e apoio sao reconhecidos.",
    },
    displacement_impact: {
      title: "Caminho de Reparacao Sensivel ao Deslocamento",
      label: "impacto de deslocamento comunitario",
      focus: "retorno seguro, acesso partilhado a abrigo ou servicos, e mediacao comunitaria cuidadosa",
      ritual: "Uma reuniao de acolhimento cuidadosa onde compromissos de reparacao sao testemunhados sem expor familias vulneraveis.",
    },
  },
  ar: {
    resource_theft: {
      title: "مسار إصلاح سرقة الموارد",
      label: "سرقة الموارد",
      focus: "رد الحق، الوصول إلى الموارد المشتركة، والمساءلة بوساطة",
      ritual: "لقاء إصلاح للموارد تؤكد فيه الأسر المتضررة رد الحق وتجديد التزامات الوصول.",
    },
    livelihood_disruption: {
      title: "مسار استعادة سبل العيش",
      label: "تعطيل سبل العيش",
      focus: "استعادة الأدوات، والوصول إلى العمل، وثقة المجتمع حول سبل العيش اليومية",
      ritual: "دائرة لاستعادة سبل العيش يتم فيها الاعتراف بالوصول إلى العمل وأفعال الإصلاح والدعم.",
    },
    displacement_impact: {
      title: "مسار إصلاح مراعي للنزوح",
      label: "أثر النزوح المجتمعي",
      focus: "عودة آمنة، ووصول مشترك إلى المأوى أو الخدمات، ووساطة مجتمعية حذرة",
      ritual: "لقاء ترحيب حذر تُشهد فيه التزامات الإصلاح دون كشف الأسر الضعيفة.",
    },
  },
};

Object.entries(adaptiveCategoryContent).forEach(([language, content]) => {
  categoryContent[language] = {
    ...categoryContent[language],
    ...content,
  };
});

export const communityContextOptions = [
  {
    groupKey: "context.group.community",
    options: ["Rural Community", "Urban Community", "Border Community", "Market Community"],
  },
  {
    groupKey: "context.group.livelihood",
    options: ["Fishing Community", "Farming Community", "Livestock Community", "Coastal Community"],
  },
  {
    groupKey: "context.group.displacement",
    options: ["Refugee Settlement", "Temporary Camp", "Relocation Area", "Displacement Settlement"],
  },
];

export const livelihoodContextOptions = [
  "Fishing",
  "Farming",
  "Livestock",
  "Small Trade",
  "Carpentry",
  "Tailoring",
  "Youth Employment",
  "Community Labor",
  "Water Access",
  "Market Activity",
];

export const reintegrationContextOptions = [
  "Community Return",
  "Youth Reintegration",
  "Family Mediation",
  "Livelihood Restoration",
  "Displacement Recovery",
  "Post-Conflict Recovery",
  "Cross-Border Reintegration",
];

const communityTypes = {
  "Rural Community": {
    ar: "مجتمع ريفي",
    en: "Rural Community",
    fr: "Communaute rurale",
    pt: "Comunidade rural",
    sw: "Jamii ya vijijini",
  },
  "Urban Community": {
    ar: "مجتمع حضري",
    en: "Urban Community",
    fr: "Communaute urbaine",
    pt: "Comunidade urbana",
    sw: "Jamii ya mjini",
  },
  "Border Community": {
    ar: "مجتمع حدودي",
    en: "Border Community",
    fr: "Communaute frontaliere",
    pt: "Comunidade fronteirica",
    sw: "Jamii ya mpakani",
  },
  "Fishing Community": {
    ar: "مجتمع صيد",
    en: "Fishing Community",
    fr: "Communaute de peche",
    pt: "Comunidade pesqueira",
    sw: "Jamii ya uvuvi",
  },
  "Farming Community": {
    ar: "مجتمع زراعي",
    en: "Farming Community",
    fr: "Communaute agricole",
    pt: "Comunidade agricola",
    sw: "Jamii ya kilimo",
  },
  "Livestock Community": {
    ar: "مجتمع رعي",
    en: "Livestock Community",
    fr: "Communaute pastorale",
    pt: "Comunidade pecuaria",
    sw: "Jamii ya mifugo",
  },
  "Refugee Settlement": {
    ar: "مستوطنة لاجئين",
    displacement: true,
    en: "Refugee Settlement",
    fr: "Site de refugies",
    pt: "Assentamento de refugiados",
    sw: "Makazi ya wakimbizi",
  },
  "Temporary Camp": {
    ar: "مخيم مؤقت",
    displacement: true,
    en: "Temporary Camp",
    fr: "Camp temporaire",
    pt: "Acampamento temporario",
    sw: "Kambi ya muda",
  },
  "Relocation Area": {
    ar: "منطقة إعادة توطين",
    displacement: true,
    en: "Relocation Area",
    fr: "Zone de relocalisation",
    pt: "Area de relocacao",
    sw: "Eneo la kuhamishiwa",
  },
  "Displacement Settlement": {
    ar: "تجمع نزوح",
    displacement: true,
    en: "Displacement Settlement",
    fr: "Site de deplacement",
    pt: "Assentamento de deslocamento",
    sw: "Makazi ya waliohamishwa",
  },
  "Coastal Community": {
    ar: "مجتمع ساحلي",
    en: "Coastal Community",
    fr: "Communaute cotiere",
    pt: "Comunidade costeira",
    sw: "Jamii ya pwani",
  },
  "Market Community": {
    ar: "مجتمع سوق",
    en: "Market Community",
    fr: "Communaute de marche",
    pt: "Comunidade de mercado",
    sw: "Jamii ya soko",
  },
  "General community": {
    ar: "مجتمع عام",
    en: "General community",
    fr: "Communaute generale",
    pt: "Comunidade geral",
    sw: "Jamii ya jumla",
  },
};

const communityAliases = {
  "Border community": "Border Community",
  "Coastal fishing community": "Fishing Community",
  "Displacement settlement": "Displacement Settlement",
  "Market town": "Market Community",
  "Pastoral community": "Livestock Community",
  "Refugee settlement": "Refugee Settlement",
  "Relocation area": "Relocation Area",
  "Rural community": "Rural Community",
  "Rural village": "Rural Community",
  "Temporary camp": "Temporary Camp",
  "Urban community": "Urban Community",
  "Urban settlement": "Urban Community",
};

const livelihoodContexts = {
  Fishing: {
    ar: "الصيد",
    en: "Fishing",
    fr: "Peche",
    grant: {
      ar: "دعم إعادة الإدماج لمستلزمات إصلاح معدات الصيد والوصول الآمن إلى العمل.",
      en: "Reintegration support for fishing equipment repair supplies and safe access to work.",
      fr: "Soutien a la reintegration pour les fournitures de reparation du materiel de peche et l'acces sur au travail.",
      pt: "Apoio de reintegracao para reparo de equipamentos de pesca e acesso seguro ao trabalho.",
      sw: "Msaada wa urejeshwaji kwa vifaa vya kurekebisha zana za uvuvi na kufikia kazi kwa usalama.",
    },
    pt: "Pesca",
    sw: "Uvuvi",
  },
  Farming: {
    ar: "الزراعة",
    en: "Farming",
    fr: "Agriculture",
    grant: {
      ar: "دعم إعادة الإدماج للبذور والأدوات الزراعية الأساسية.",
      en: "Reintegration support for seeds and basic farming tools.",
      fr: "Soutien a la reintegration pour des semences et des outils agricoles de base.",
      pt: "Apoio de reintegracao para sementes e ferramentas agricolas basicas.",
      sw: "Msaada wa urejeshwaji kwa mbegu na zana za msingi za kilimo.",
    },
    pt: "Agricultura",
    sw: "Kilimo",
  },
  Livestock: {
    ar: "الثروة الحيوانية",
    en: "Livestock",
    fr: "Elevage",
    grant: {
      ar: "دعم إعادة الإدماج لمواد رد الحق واستقرار سبل العيش الرعوية.",
      en: "Reintegration support for restitution materials and livestock livelihood stability.",
      fr: "Soutien a la reintegration pour les materiaux de restitution et la stabilite de l'elevage.",
      pt: "Apoio de reintegracao para materiais de restituicao e estabilidade pecuaria.",
      sw: "Msaada wa urejeshwaji kwa vifaa vya fidia na uthabiti wa riziki ya mifugo.",
    },
    pt: "Pecuaria",
    sw: "Mifugo",
  },
  "Small Trade": {
    ar: "تجارة صغيرة",
    en: "Small Trade",
    fr: "Petit commerce",
    grant: {
      ar: "دعم إعادة الإدماج لمخزون صغير أو سلع بداية آمنة.",
      en: "Reintegration support for small stock or safe starter goods.",
      fr: "Soutien a la reintegration pour un petit stock ou des biens de demarrage surs.",
      pt: "Apoio de reintegracao para pequeno estoque ou bens iniciais seguros.",
      sw: "Msaada wa urejeshwaji kwa bidhaa ndogo au mtaji salama wa kuanzia.",
    },
    pt: "Pequeno comercio",
    sw: "Biashara ndogo",
  },
  Carpentry: {
    ar: "النجارة",
    en: "Carpentry",
    fr: "Menuiserie",
    grant: {
      ar: "دعم إعادة الإدماج لأدوات يدوية ومواد خشبية.",
      en: "Reintegration support for hand tools and wood materials.",
      fr: "Soutien a la reintegration pour des outils manuels et du bois.",
      pt: "Apoio de reintegracao para ferramentas manuais e materiais de madeira.",
      sw: "Msaada wa urejeshwaji kwa zana za mikono na vifaa vya mbao.",
    },
    pt: "Carpintaria",
    sw: "Useremala",
  },
  Tailoring: {
    ar: "الخياطة",
    en: "Tailoring",
    fr: "Couture",
    grant: {
      ar: "دعم إعادة الإدماج للأقمشة ومستلزمات الخياطة.",
      en: "Reintegration support for fabric and sewing supplies.",
      fr: "Soutien a la reintegration pour du tissu et du materiel de couture.",
      pt: "Apoio de reintegracao para tecidos e materiais de costura.",
      sw: "Msaada wa urejeshwaji kwa vitambaa na vifaa vya ushonaji.",
    },
    pt: "Costura",
    sw: "Ushonaji",
  },
  "Youth Employment": {
    ar: "تشغيل الشباب",
    en: "Youth Employment",
    fr: "Emploi des jeunes",
    grant: {
      ar: "دعم إعادة الإدماج للتدريب السلمي ومتابعة الشباب.",
      en: "Reintegration support for peaceful livelihood training and youth follow-up.",
      fr: "Soutien a la reintegration pour une formation pacifique aux moyens de subsistance et le suivi des jeunes.",
      pt: "Apoio de reintegracao para formacao pacifica e acompanhamento de jovens.",
      sw: "Msaada wa urejeshwaji kwa mafunzo ya riziki ya amani na ufuatiliaji wa vijana.",
    },
    pt: "Emprego juvenil",
    sw: "Ajira ya vijana",
  },
  "Community Labor": {
    ar: "عمل مجتمعي",
    en: "Community Labor",
    fr: "Travail communautaire",
    grant: {
      ar: "دعم إعادة الإدماج للنقل الآمن ومواد خدمة المجتمع.",
      en: "Reintegration support for safe transport and community service materials.",
      fr: "Soutien a la reintegration pour le transport sur et les materiaux de service communautaire.",
      pt: "Apoio de reintegracao para transporte seguro e materiais de servico comunitario.",
      sw: "Msaada wa urejeshwaji kwa usafiri salama na vifaa vya huduma ya jamii.",
    },
    pt: "Trabalho comunitario",
    sw: "Kazi ya jamii",
  },
  "Water Access": {
    ar: "الوصول إلى المياه",
    en: "Water Access",
    fr: "Acces a l'eau",
    grant: {
      ar: "دعم إعادة الإدماج لإصلاح الوصول إلى المياه والنقل الآمن.",
      en: "Reintegration support for water access repair and safe transport.",
      fr: "Soutien a la reintegration pour la reparation de l'acces a l'eau et le transport sur.",
      pt: "Apoio de reintegracao para reparo do acesso a agua e transporte seguro.",
      sw: "Msaada wa urejeshwaji kwa kurekebisha upatikanaji wa maji na usafiri salama.",
    },
    pt: "Acesso a agua",
    sw: "Upatikanaji wa maji",
  },
  "Market Activity": {
    ar: "نشاط السوق",
    en: "Market Activity",
    fr: "Activite de marche",
    grant: {
      ar: "دعم إعادة الإدماج للعودة الآمنة إلى السوق والبضائع الأولية.",
      en: "Reintegration support for safe market return and starter goods.",
      fr: "Soutien a la reintegration pour un retour sur au marche et des biens de demarrage.",
      pt: "Apoio de reintegracao para retorno seguro ao mercado e bens iniciais.",
      sw: "Msaada wa urejeshwaji kwa kurudi salama sokoni na bidhaa za kuanzia.",
    },
    pt: "Atividade de mercado",
    sw: "Shughuli za soko",
  },
};

const reintegrationContexts = {
  "Community Return": {
    ar: "عودة مجتمعية",
    en: "Community Return",
    fr: "Retour communautaire",
    pt: "Retorno comunitario",
    sw: "Kurudi kwa jamii",
  },
  "Youth Reintegration": {
    ar: "إعادة إدماج الشباب",
    en: "Youth Reintegration",
    fr: "Reintegration des jeunes",
    pt: "Reintegracao juvenil",
    sw: "Urejeshwaji wa vijana",
  },
  "Family Mediation": {
    ar: "وساطة أسرية",
    en: "Family Mediation",
    fr: "Mediation familiale",
    pt: "Mediacao familiar",
    sw: "Upatanisho wa familia",
  },
  "Livelihood Restoration": {
    ar: "استعادة سبل العيش",
    en: "Livelihood Restoration",
    fr: "Restauration des moyens de subsistance",
    pt: "Restauracao de meios de vida",
    sw: "Kurejesha riziki",
  },
  "Displacement Recovery": {
    ar: "تعاف من النزوح",
    en: "Displacement Recovery",
    fr: "Retablissement apres deplacement",
    pt: "Recuperacao apos deslocamento",
    sw: "Urejeshwaji baada ya uhamisho",
  },
  "Post-Conflict Recovery": {
    ar: "تعاف بعد النزاع",
    en: "Post-Conflict Recovery",
    fr: "Retablissement post-conflit",
    pt: "Recuperacao pos-conflito",
    sw: "Urejeshwaji baada ya mgogoro",
  },
  "Cross-Border Reintegration": {
    ar: "إعادة إدماج عابرة للحدود",
    en: "Cross-Border Reintegration",
    fr: "Reintegration transfrontaliere",
    pt: "Reintegracao transfronteirica",
    sw: "Urejeshwaji wa kuvuka mipaka",
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
  resource_theft: {
    ar: "دعم إعادة الإدماج لرد الموارد واستعادة الوصول الآمن إلى الخدمات المشتركة.",
    en: "Reintegration support for resource restitution and safe restored access to shared services.",
    fr: "Soutien a la reintegration pour la restitution des ressources et le retablissement sur de l'acces aux services partages.",
    pt: "Apoio de reintegracao para restituicao de recursos e acesso seguro a servicos partilhados.",
    sw: "Msaada wa urejeshwaji kwa fidia ya rasilimali na kurejesha upatikanaji salama wa huduma za pamoja.",
  },
  livelihood_disruption: {
    ar: "دعم إعادة الإدماج لاستعادة أدوات العمل والوصول الآمن إلى سبل العيش.",
    en: "Reintegration support for restoring work tools and safe livelihood access.",
    fr: "Soutien a la reintegration pour restaurer les outils de travail et l'acces sur aux moyens de subsistance.",
    pt: "Apoio de reintegracao para restaurar ferramentas de trabalho e acesso seguro aos meios de vida.",
    sw: "Msaada wa urejeshwaji kwa kurejesha zana za kazi na upatikanaji salama wa riziki.",
  },
  displacement_impact: {
    ar: "دعم إعادة الإدماج للنقل الآمن ومواد خدمة المجتمع في بيئة نزوح حساسة.",
    en: "Reintegration support for safe transport and community service materials in a displacement-aware setting.",
    fr: "Soutien a la reintegration pour le transport sur et les materiaux de service communautaire dans un contexte sensible au deplacement.",
    pt: "Apoio de reintegracao para transporte seguro e materiais de servico comunitario em contexto sensivel ao deslocamento.",
    sw: "Msaada wa urejeshwaji kwa usafiri salama na vifaa vya huduma ya jamii katika mazingira yanayozingatia uhamisho.",
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

function normalizeCommunityType(value) {
  return communityAliases[value] || value || "General community";
}

function getCommunityContext(value, language) {
  const nextLanguage = normalizeLanguage(language);
  const normalizedType = normalizeCommunityType(value);
  const context = communityTypes[normalizedType] || communityTypes["General community"];

  return {
    displacement: Boolean(context.displacement),
    label: context[nextLanguage] || context.en,
    value: normalizedType,
  };
}

function getLivelihoodContext(value, language) {
  const nextLanguage = normalizeLanguage(language);
  const context = livelihoodContexts[value];

  if (!context) {
    return { grant: "", label: "", value: "" };
  }

  return {
    grant: context.grant?.[nextLanguage] || context.grant?.en || "",
    label: context[nextLanguage] || context.en,
    value,
  };
}

function getReintegrationContext(value, language) {
  const nextLanguage = normalizeLanguage(language);
  const context = reintegrationContexts[value];

  if (!context) {
    return { label: "", value: "" };
  }

  return {
    label: context[nextLanguage] || context.en,
    value,
  };
}

const contextSentences = {
  en({ impact, livelihood, reintegration, settlement }) {
    const parts = [
      settlement ? `settlement context: ${settlement}` : "",
      livelihood ? `livelihood/resource focus: ${livelihood}` : "",
      reintegration ? `reintegration context: ${reintegration}` : "",
      impact ? `community impact: ${impact}` : "",
    ].filter(Boolean);
    return parts.length ? `The pathway is adapted for ${parts.join("; ")}.` : "";
  },
  sw({ impact, livelihood, reintegration, settlement }) {
    const parts = [
      settlement ? `mazingira ya makazi: ${settlement}` : "",
      livelihood ? `mwelekeo wa riziki/rasilimali: ${livelihood}` : "",
      reintegration ? `muktadha wa urejeshwaji: ${reintegration}` : "",
      impact ? `athari kwa jamii: ${impact}` : "",
    ].filter(Boolean);
    return parts.length ? `Njia hii imebadilishwa kwa ${parts.join("; ")}.` : "";
  },
  fr({ impact, livelihood, reintegration, settlement }) {
    const parts = [
      settlement ? `contexte d'installation : ${settlement}` : "",
      livelihood ? `moyen de subsistance/ressource : ${livelihood}` : "",
      reintegration ? `contexte de reintegration : ${reintegration}` : "",
      impact ? `impact communautaire : ${impact}` : "",
    ].filter(Boolean);
    return parts.length ? `Le parcours est adapte a ${parts.join("; ")}.` : "";
  },
  pt({ impact, livelihood, reintegration, settlement }) {
    const parts = [
      settlement ? `contexto de assentamento: ${settlement}` : "",
      livelihood ? `foco de meio de vida/recurso: ${livelihood}` : "",
      reintegration ? `contexto de reintegracao: ${reintegration}` : "",
      impact ? `impacto comunitario: ${impact}` : "",
    ].filter(Boolean);
    return parts.length ? `O caminho e adaptado para ${parts.join("; ")}.` : "";
  },
  ar({ impact, livelihood, reintegration, settlement }) {
    const parts = [
      settlement ? `سياق الاستقرار: ${settlement}` : "",
      livelihood ? `تركيز سبل العيش/المورد: ${livelihood}` : "",
      reintegration ? `سياق إعادة الإدماج: ${reintegration}` : "",
      impact ? `الأثر المجتمعي: ${impact}` : "",
    ].filter(Boolean);
    return parts.length ? `تم تكييف المسار مع ${parts.join("؛ ")}.` : "";
  },
};

const displacementSentences = {
  ar: "لأن هذا سياق مراعي للنزوح، يتجنب المسار كشف الناس، ويحمي كرامة الأسر، ويحافظ على خطوات إصلاح عملية وآمنة.",
  en: "Because this is a displacement-aware setting, the plan avoids exposure, protects household dignity, and keeps repair steps practical and safe.",
  fr: "Comme il s'agit d'un contexte sensible au deplacement, le plan evite l'exposition, protege la dignite des foyers et garde les reparations pratiques et sures.",
  pt: "Como este e um contexto sensivel ao deslocamento, o plano evita exposicao, protege a dignidade das familias e mantem reparos praticos e seguros.",
  sw: "Kwa kuwa haya ni mazingira yanayohusiana na uhamisho, mpango huepuka kufichua watu, hulinda heshima ya kaya, na kuweka hatua za marekebisho ziwe za vitendo na salama.",
};

function buildContextSentence(context = {}, language) {
  const nextLanguage = normalizeLanguage(language);
  const settlement = getCommunityContext(context.communityType, nextLanguage);
  const livelihood = getLivelihoodContext(context.livelihoodType, nextLanguage);
  const reintegration = getReintegrationContext(context.reintegrationContext, nextLanguage);
  const sentence = contextSentences[nextLanguage]({
    impact: typeof context.communityImpact === "string" ? context.communityImpact.trim() : "",
    livelihood: livelihood.label,
    reintegration: reintegration.label,
    settlement: settlement.label,
  });
  const displacementSentence = settlement.displacement ? displacementSentences[nextLanguage] : "";

  return [sentence, displacementSentence].filter(Boolean).join(" ");
}

function getPeaceBondContext(peaceBond = {}) {
  return {
    communityImpact: peaceBond.communityImpact || "",
    communityType: peaceBond.communityType || "General community",
    livelihoodType: peaceBond.livelihoodType || "",
    reintegrationContext: peaceBond.reintegrationContext || "",
  };
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
  return getCommunityContext(communityType, language).label;
}

export function translateLivelihoodType(livelihoodType, language) {
  return getLivelihoodContext(livelihoodType, language).label;
}

export function translateReintegrationContext(reintegrationContext, language) {
  return getReintegrationContext(reintegrationContext, language).label;
}

export function translateCommunityContextSummary(peaceBond, language) {
  return buildContextSentence(getPeaceBondContext(peaceBond), language);
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
  const contextSentence = buildContextSentence(getPeaceBondContext(peaceBond), nextLanguage);

  if (!categoryContent[nextLanguage]?.[category]) {
    return Array.isArray(peaceBond?.repairActions) ? peaceBond.repairActions : [];
  }

  const content = getCategoryContent(category, nextLanguage);
  const actions = actionPatterns[nextLanguage][severity].map((action) =>
    fillTemplate(action, {
      focus: content.focus,
      label: content.label,
    })
  );

  if (contextSentence) {
    actions[2] = `${actions[2]} ${contextSentence}`;
  }

  return actions;
}

export function translateRitual(peaceBond, language) {
  return getCategoryContent(peaceBond?.category, language).ritual || peaceBond?.ritual || "";
}

export function translateGrantPurpose(peaceBond, language) {
  const nextLanguage = normalizeLanguage(language);
  const livelihood = getLivelihoodContext(peaceBond?.livelihoodType, nextLanguage);

  if (livelihood.grant) {
    return livelihood.grant;
  }

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

  return [
    fillTemplate(explanationTemplates[nextLanguage], {
      focus: content.focus,
      label: content.label,
      severity: translateSeverity(peaceBond?.severity, nextLanguage),
    }),
    buildContextSentence(getPeaceBondContext(peaceBond), nextLanguage),
  ].filter(Boolean).join(" ");
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
    contextSummary: translateCommunityContextSummary(peaceBond, language),
    explanation: translatePlanExplanation(peaceBond, language),
    grantPurpose,
    livelihoodTypeLabel: translateLivelihoodType(peaceBond.livelihoodType, language),
    repairActions: translateRepairActions(peaceBond, language),
    reintegrationContextLabel: translateReintegrationContext(
      peaceBond.reintegrationContext,
      language
    ),
    ritual: translateRitual(peaceBond, language),
    severityLabel: translateSeverity(peaceBond.severity, language),
    grant: {
      ...peaceBond.grant,
      purpose: grantPurpose,
    },
  };
}
